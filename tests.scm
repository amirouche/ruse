(define-library (tests)

  (export add times pk)

  (begin

    (define add (javascript-procedure add))

    (define times (javascript-procedure times))

    (define pk (javascript-procedure pk))))
