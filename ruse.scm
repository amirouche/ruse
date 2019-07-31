(define-library (ruse)
  (export define-syntax-rule)

  (begin

  (define-syntax define-syntax-rule
    (syntax-rules ()
      ((define-syntax-rule (keyword args ...) body)
       (define-syntax keyword
         (syntax-rules ()
           ((keyword args ...) body))))))))
