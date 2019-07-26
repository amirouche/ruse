(begin
  (let loop ([thunk ((lambda (k)
                       (lambda ()
                         ((lambda (k) (k 1))
                           (lambda (v0)
                             (lambda ()
                               ((lambda (k) (k 2))
                                 (lambda (v1) (k (add v0 v1)))))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

