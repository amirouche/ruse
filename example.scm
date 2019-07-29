(define-library (example)
  (export example proc)

  (begin
    (define example 101)
    (define (proc) (cons 4 2))))
