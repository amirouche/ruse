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

(define (program-body+imports program)
  (let loop ((program program)
             (imports '()))
    (cond
     ((null? program)
      (error 'packer "program body is empty"))
     ((and (pair? (car program))
           (eq? (caar program) 'import))
      (loop (cdr program) (append (cdar program) imports)))
     (else (values program imports)))))

(define (explode definition)
  (let loop ((body (cddr definition))
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
     (else (error 'packer "error during library parsing" (cadr definition))))))

(define program (read-file (cadr (command-line))))

(define-values (program imports) (program-body+imports program))

(define libraries '())
(define program-dependencies '())

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
(define dependencies '())


;; read all required libraries
(let loop ((imports imports))
  (unless (null? imports)
    ;; deduplicate libraries
    (if (ref libraries (car imports))
        (loop (cdr imports))
        (let ((library (read-library (library-name->filepath (car imports)))))
          (set! libraries (cons (cons (car imports) library) libraries))
          (set! library-module-names (cons (cons (car imports) (make-module-name))
                                           library-module-names))
          (call-with-values (lambda () (explode library))
            (lambda (exports depends body)
              (let loop ((depends depends))
                (unless (null? depends)
                  (set! dependencies (cons (cons (car imports) (car depends))
                                           dependencies))
                  (loop (cdr depends))))
              (loop (append (cdr imports) depends))))))))

(define module-bodies '())

(define (process name module-name definition)
  (assert (equal? (cadr definition) name))
  (call-with-values (lambda () (explode definition))
    (lambda (exports imports body)
      (let* ((imports (map (lambda (x) (ref library-module-names x)) imports))
             (body `(module ,module-name
                            ,exports
                            ,@(if (null? imports) '() `((import ,@imports)))
                            ,@body)))
        (set! module-bodies (cons (cons name body) module-bodies))))))

;; topological sort of libraries according to dependencies based on
;; https://en.wikipedia.org/wiki/Topological_sorting#Algorithms
(define no-dependency '())

(let loop ((libraries libraries))
  (unless (null? libraries)
    (let ((library (car libraries)))
      (if (ref dependencies (car library))
          (loop (cdr libraries))
          (begin (set! no-dependency (cons (car library) no-dependency))
                 (loop (cdr libraries)))))))

(pk 'no-dependency no-dependency)

(define order (let loop0 ((no-dependency no-dependency)
                        (out '()))
              (pk 'no-dependency no-dependency)
              (if (null? no-dependency)
                  (reverse out)
                  (let ((dependency (car no-dependency)))
                    (set! no-dependency (cdr no-dependency))
                    (let loop1 ((used-by (filter (lambda (x) (equal? (cdr x) dependency)) dependencies)))
                      (unless (null? used-by)
                        (set! dependencies (remove (car used-by) dependencies))
                        (unless (ref dependencies (caar used-by))
                          (set! no-dependency (cons (caar used-by) no-dependency)))
                        (loop1 (cdr used-by))))
                    (loop0 no-dependency (cons dependency out))))))

(let loop ((libraries libraries))
  (unless (null? libraries)
    (process (caar libraries)
             (ref library-module-names (caar libraries))
             (cdar libraries))
    (loop (cdr libraries))))

(pk (expand (pk `(begin
                   ,@(map (lambda (x) (ref module-bodies x)) order)
                   ,@(map (lambda (x) `(import ,(ref library-module-names x))) imports)
                   ,@program))))
