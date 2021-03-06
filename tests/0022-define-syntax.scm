(begin

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

  (define x (cons 1 2))
  (set-car! x 42)
  (car x))
