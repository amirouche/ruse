(define-library (scheme base)

  (export assume)
  (export null? cons pair? car cdr set-car! set-cdr! list)

  (begin

    (define assume (javascript-procedure assume))

    (define null? (javascript-procedure nullp))

    (define ruse-make-record-type (javascript-procedure ruse_make_record_type))

    (define ruse-record-constructor (javascript-procedure ruse_record_constructor))

    (define ruse-record-predicate (javascript-procedure ruse_record_predicate))

    (define ruse-record-accessor (javascript-procedure ruse_record_accessor))

    (define ruse-record-modifier (javascript-procedure ruse_record_modifier))

    (define-syntax define-record-type
      (syntax-rules ()
        ((define-record-type type
           (constructor constructor-tag ...)
           predicate
           (field-tag accessor modifier) ...)
         (begin
           (define type
             (ruse-make-record-type 'type 'field-tag ...))
           (define constructor
             (ruse-record-constructor type))
           (define predicate
             (ruse-record-predicate type))
           (begin
             (define accessor (ruse-record-accessor type 'field-tag))
             (define modifier (ruse-record-modifier type 'field-tag)))
           ...))))

    (define-record-type <cons>
      (cons car cdr)
      pair?
      (car car set-car!)
      (cdr cdr set-cdr!))

    (define list (lambda args args))

    ;; (define cons*
    ;;   (lambda (a . rest)
    ;;     (let loop ((args (cons a rest))
    ;;                (out '()))
    ;;       (if (and (pair? args) (null? (cdr args)))
    ;;           (let loop ((reversed out)
    ;;                      (out (car args)))
    ;;             (if (null? reversed)
    ;;                 out
    ;;                 (loop (cdr reversed) (cons (car reversed) out))))
    ;;           (loop (cdr args) (cons (car args) out))))))

    ))
