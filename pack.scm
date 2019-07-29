(optimize-level 0)

(define (pk . args)
  (pretty-print args)
  (newline)
  (car (reverse args)))

(define unique-var
  (let ()
    (define count 0)
    (lambda (name)
      (let ([c count])
        (set! count (+ count 1))
        (string->symbol
         (string-append (symbol->string name) "." (number->string c)))))))

(define make-module-name (lambda () (unique-var 'm)))

(define filepath (cadr (command-line)))

(define (read-file filepath)
  (call-with-input-file filepath
    (lambda (port)
      (let loop ((current (read port))
                 (out '()))
        (if (eof-object? current)
            (reverse out)
            (loop (read port) (cons current out)))))))

(define (read-library filepath)
  (car (read-file filepath)))

(define (program-split program)
  (let loop ((program program)
             (imports '()))
    (cond
     ((null? program)
      (error 'packer "program body is empty"))
     ((and (pair? (car program))
           (eq? (caar program) 'import))
      ;; TODO: support multiple imported libraries in the same import
      ;; statement.
      (loop (cdr program) (cons (cadar program) imports)))
     (else (values program imports)))))


(define program (pk (read-file (cadr (command-line)))))

(define-values (program imports) (program-split program))

(define libraries '())

(define string-join
  (lambda (str* jstr)
    (cond
     [(null? str*) ""]
     [(null? (cdr str*)) (car str*)]
     [else (string-append (car str*) jstr (string-join (cdr str*) jstr))])))

(define (library-name->filepath name)
  (string-append (string-join (map symbol->string name) "/") ".scm"))

(define (ref alist v)
  (let loop ((alist alist))
    (if (null? alist)
        #f
        (if (equal? (caar alist) v)
            (cdar alist)
            (loop (cdr alist))))))

(define library-module-names '())

(let loop ((imports imports))
  (unless (null? imports)
    ;; deduplicate libraries
    (unless (ref libraries (car imports))
      (let ((library (read-library (library-name->filepath (car imports)))))
        (set! libraries (cons (cons (car imports) library) libraries))
        (set! library-module-names (cons (cons (car imports) (make-module-name))
                                         library-module-names))
        (loop (cdr imports))))))

(define module-bodies '())

(define (explode body)
  (let loop ((body body)
             (exports '())
             (imports '()))
    (cond
     ((null? body) (values exports imports '()))
     ((and (pair? (car body)) (eq? (caar body) 'begin))
      (values exports imports (cdar body)))
     ((and (pair? (car body)) (eq? (caar body) 'export))
      (loop (cdr body) (append (cdar body) exports) imports))
     ((and (pair? (car body)) (eq? (caar body) 'import))
      (loop (cdr body) exports (append (cdar body) imports)))
     (else (error 'packer "error during library parsing")))))


(define (process name module-name definition)
  (assert (equal? (cadr definition) name))
  (call-with-values (lambda () (explode (cddr definition)))
    (lambda (exports imports body)
      (set! module-bodies (cons `(module ,module-name ,exports ,@body)
                                module-bodies)))))


(let loop ((libraries libraries))
  (unless (null? libraries)
    (process (caar libraries)
             (ref library-module-names (caar libraries))
             (cdar libraries))
    (loop (cdr libraries))))

(pk (expand (pk `(begin
                   ,@module-bodies

                   ,@(map (lambda (x) `(import ,(ref library-module-names (car x)))) libraries)

                   ,@program))))
