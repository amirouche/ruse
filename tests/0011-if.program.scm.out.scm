(begin
  (let loop ([thunk ((lambda (k)
                       ((lambda (k) (k 1))
                         (lambda (kif)
                           (if kif
                               (lambda () ((lambda (k) (k 42)) k))
                               (lambda () ((lambda (k) (k 0)) k))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

