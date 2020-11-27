(import (rename (chezscheme) (define-record-type define-record-type*)))
(import (matchable))


;; handy helper tool util...

(define (list->generator lst)
  (lambda ()
    (if (null? lst)
        (eof-object)
        (let ((out (car lst)))
          (set! lst (cdr lst))
          out))))

(define (directory-list* path)
  (sort string<?
        (map (lambda (x) (string-append path "/" x))
             (directory-list path))))

(define (append-map proc lst)
  (apply append (map proc lst)))

(define (fold proc seed lst)
  (let loop ((out seed)
             (lst lst))
    (if (null? lst)
        out
        (loop (proc (car lst) out) (cdr lst)))))

(define (pk . args)
  (display ";; ") (write args (current-error-port)) (newline)
  (car (reverse args)))

(define (read-string port)
  (let loop ((out '()))
    (let ((char (read-char port)))
      (if (eof-object? char)
          (list->string (reverse out))
          (loop (cons char out))))))

(define (string-join strings delimiter)
  (if (null? strings)
      ""
      (fold (lambda (s so-far) (string-append so-far delimiter s))
            (car strings)
            (cdr strings))))

(define (string-split str ch)
  (let ((len (string-length str)))
    (letrec
        ((split
          (lambda (a b)
            (cond
             ((>= b len) (if (= a b) '() (cons (substring str a b) '())))
             ((char=? ch (string-ref str b)) (if (= a b)
                                                 (split (+ 1 a) (+ 1 b))
                                                 (cons (substring str a b) (split b b))))
             (else (split a (+ 1 b)))))))
      (split 0 0))))

(define-syntax define-record-type
  ;;
  ;; Copyright 2010 Derick Eddington.  My MIT-style license is in the file named
  ;; LICENSE from the original collection this file is distributed with.
  ;;
  ;; Taken from chez-srfi's srfi-9.
  ;;
  (lambda (stx)
    (syntax-case stx ()
      ((_ type (constructor constructor-tag ...)
          predicate
          (field-tag accessor setter ...) ...)
       (and (for-all identifier?
                     #'(type constructor constructor-tag ... predicate
                             field-tag ... accessor ... setter ... ...))
            (for-all (lambda (s) (<= 0 (length s) 1))
                     #'((setter ...) ...))
            (for-all (lambda (ct)
                       (memp (lambda (ft) (bound-identifier=? ct ft))
                             #'(field-tag ...)))
                     #'(constructor-tag ...)))
       (with-syntax (((field-clause ...)
                      (map (lambda (clause)
                             (if (= 2 (length clause))
                                 #`(immutable . #,clause)
                                 #`(mutable . #,clause)))
                           #'((field-tag accessor setter ...) ...)))
                     ((unspec-tag ...)
                      (remp (lambda (ft)
                              (memp (lambda (ct) (bound-identifier=? ft ct))
                                    #'(constructor-tag ...)))
                            #'(field-tag ...))))
                    #'(define-record-type* (type constructor predicate)
                        (protocol (lambda (ctor)
                                    (lambda (constructor-tag ...)
                                      (define unspec-tag) ...
                                      (ctor field-tag ...))))
                        (fields field-clause ...)))))))

;; framework-ish stuff

(define %steps '())

(define (steps-ref name)
  (let loop ((steps %steps))
    (match steps
      ('() (error 'steps-ref "unknown step" name))
      (((k . v) . rest)
       (if (string=? k name) v (loop (cdr steps)))))))

(define-record-type <step>
  (make-step name parent reader compiler evaler)
  step?
  (name step-name)
  (parent step-parent)
  (reader step-reader)
  (compiler step-compiler)
  (evaler step-evaler))

(define (make-step! name parent reader compiler evaler)
  (define step (make-step name parent reader compiler evaler))
  (set! %steps (cons (cons name step) %steps))
  step)

(define (step-read step filepath)
  (define read (step-reader step))

  (call-with-input-file filepath
    (lambda (port)
      (let loop ((out '(begin)))
        (let ((sexp (read port)))
          (if (eof-object? sexp)
              (reverse out)
              (loop (cons sexp out))))))))


(define (step-compile step sexp)
  ((step-compiler step) sexp))

(define (step-eval step obj)
  ((step-evaler step) obj))

;; ruse!

(define g
  (let ((i 0))
    (lambda ()
      (set! i (fx+ i 1))
      (string->symbol (string-append "t" (number->string i))))))

(define (maybe-begin step)
  (lambda (exp)
    (match exp
      (('begin exprs ...) `(begin ,@(map step exprs)))
      (_ (step exp)))))

;; parser

(define (zip a b)
  (map list a b))

(define (%ref alist key default)
  (let loop ((alist alist))
    (if (null? alist)
        (default)
        (if (eq? (caar alist) key)
            (cdar alist)
            (loop (cdr alist))))))

(define ref
  (case-lambda
   ((a b) (ref a b (lambda () (error 'ref "unknown key" b))))
   ((a b c) (%ref a b c))))

(define (parser expr)
  (match expr
    ('() '())
    (('define target value)
     (error 'parser "define not supported, yet!")
     `(define ,target ,(parser value)))
    (('set! target value) `(set! ,target ,(parser value)))
    (('let ((,a ,b) ...) body ...) `(let ,(zip a b) ,@(map parser body)))
    ((args ...) (map parser args))
    (e (parser e))))

(define step-parser (make-step! "parser" #f read (maybe-begin parser) #f))

;; step-renamer

(define (renamer expr env)
  (match expr
    (('let ((a b) ...) e* ...)
     (let loop ((bindings (map cons a b))
                (env* env)
                (out '()))
       (if (null? bindings)
           `(let ,(reverse out)
              ,@(map (lambda (e) (renamer e env*)) e*))
           (let* ((a* (g))
                  (env* (cons (cons (caar bindings) a*) env*))
                  (b* (renamer (cdar bindings) env*)))
             (loop (cdr bindings) env* (cons (list a* b*) out))))))
    ((e* ...) (map (lambda (e) (renamer e env)) e*))
    (e (ref env e (lambda () e)))))

(define (renamer* sexp)
  (renamer sexp '()))

(define step-renamer (make-step! "renamer" step-parser read (maybe-begin renamer*) #f))

;; let-as-lambda

(define (let-as-lambda e)
  (match e
    (('let ((a b) ...) e* ...)
     `((lambda ,a ,@e*) ,@b))
    ((e* ...) (map (lambda (e) (let-as-lambda e)) e*))
    (e e)))

(define step-let-as-lambda (make-step! "let-as-lambda"
                                       step-renamer
                                       read
                                       (maybe-begin let-as-lambda) #f))


;; let as define

(define (definer expr)
  (match expr
    (('let ((a b) ...) e ...)
     `(begin ,@(map (lambda (a b) `(define ,a ,(definer b))) a b)
             ,@(map definer e)))
    ((e ...) (map definer e))
    (e e)))

(define step-definer (make-step! "definer" step-let-as-lambda read (maybe-begin definer) #f))

;; step-javascripter
;;
;; Will produce javascript from a scheme expression.

(define (javascripter sexp)
  (match sexp
    ((? boolean? b) (if b "true" "false"))
    ((? symbol? s) (symbol->string s))
    ((? number? n) (number->string n))
    ((? string? s) (string-append "\"" s "\""))

    (('begin magic ...) (string-join (map javascripter magic) ";\n"))

    (('set! target value) (string-append (symbol->string target)
                                        " = "
                                        (javascripter value)))

    (('define target value) (string-append "let "
                                          (symbol->string target)
                                          " = "
                                          (javascripter value)))

    (('lambda (args ...) ('begin exprs ... last))
     (string-append "function("
                    (string-join (map javascripter args) ", ")
                    ") {\n"
                    (string-join (map javascripter exprs) ";\n")
                    ";\n"
                    "return "
                    (javascripter last)
                    ";\n}"))

    (('lambda (args ...) expr)
     (string-append "function("
                    (string-join (map javascripter args) ", ")
                    ") { return "
                    (javascripter expr)
                    "; }"))

    (('%%inline-host-expression string args ...)
     (apply format string args))

    (('if a b c) (string-append "("
                                (javascripter a)
                                " ? "
                                (javascripter b)
                                " : "
                                (javascripter c)
                                ")"))

    ((proc args ...)
     (string-append (javascripter proc)
                    "("
                    (string-join (map javascripter args) ", ")
                    ")"))))

(define (nodejs string)
  (call-with-values (lambda () (open-process-ports "nodejs -p -"
                                                   'block
                                                   (current-transcoder)))
    (lambda (stdin stdout stderr id)
      (display string stdin)
      (close-port stdin)
      (read-string stdout))))

(define step-javascripter (make-step! "javascripter" step-definer read javascripter nodejs))

;; executor

(define (make-pipe start end)
  (let loop ((step end)
             (out '()))
    (if (eq? step start)
        (cons start out)
        (loop (step-parent step) (cons step out)))))

(define (exec start end filepath)
  (define end* (steps-ref end))
  (define start* (steps-ref start))

  (let loop ((pipe (make-pipe start* end*))
             (sexp (step-read start* filepath)))
    (if (null? pipe)
        (values sexp (step-eval end* sexp))
        (loop (cdr pipe) (pk (step-name (car pipe)) ': (step-compile (car pipe) sexp))))))

(define (check-prepare name)
  (match (string-split name #\/)
    ((_0 _1 start end _2) (values start
                                       end
                                       (string-append name "/input")
                                       (string-append name "/output")))))

(define (check-check name)
  (call-with-values (lambda () (check-prepare name))
    (lambda (start end input output)
      (display (string-append "* " name "\n"))
      (call-with-values (lambda () (exec start end input))
        (lambda (program result)
          (let ((expected (call-with-input-file output read-string)))
            (if (string=? result expected)
                (display "** OK\n")
                (begin
                  (display "** FAIL\n")
                  (display "*** Expected:\n")
                  (newline) (display expected) (newline)
                  (display "*** Program:\n")
                  (display program)(newline)
                  (display "*** Got:\n")
                  (newline) (display result) (newline)
                  (display (string-append "** Retry with: scheme --program ruse.scm "
                                          name
                                          "\n"))))))))))


(define (check-generator)
  (list->generator
   (append-map directory-list* ;; end
               (append-map directory-list* ;; start
                           (append-map directory-list* ;; 000
                                       (directory-list* "checks"))))))

(define (check-all)
  (define checks (check-generator))
  (let loop ()
    (let ((check (checks)))
      (unless (eof-object? check)
        (check-check check )
        (loop)))))

(match (cdr (command-line))
  (() (check-all))
  ((pathcheck) (check-check pathcheck)))
