(begin
  (let loop ([thunk ((lambda (k)
                       (lambda ()
                         ((lambda (k)
                            (k (lambda (k square.0)
                                 (lambda ()
                                   ((lambda (k)
                                      (lambda ()
                                        (square.0
                                          (lambda (v)
                                            (lambda ()
                                              ((lambda (k) (k 1337))
                                                (lambda (v0)
                                                  (lambda ()
                                                    (v k
                                                       (lambda (kv)
                                                         (kv v0)))))))))))
                                     k)))))
                           (lambda (v)
                             (lambda ()
                               ((lambda (k)
                                  (k (lambda (k value.1)
                                       (lambda ()
                                         ((lambda (k)
                                            (lambda ()
                                              (value.1
                                                (lambda (v0)
                                                  (lambda ()
                                                    (value.1
                                                      (lambda (v1)
                                                        (k (times
                                                             v0
                                                             v1)))))))))
                                           k)))))
                                 (lambda (v0)
                                   (lambda ()
                                     (v k (lambda (kv) (kv v0)))))))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

