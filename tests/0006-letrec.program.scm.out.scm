(begin
  (let loop ([thunk ((lambda (k)
                       (lambda ()
                         ((lambda (k)
                            (k (lambda (k abc.0)
                                 (lambda ()
                                   ((lambda (k)
                                      (lambda ()
                                        ((lambda (k)
                                           (k (lambda (k t.1)
                                                (lambda () (abc.0 k)))))
                                          (lambda (v)
                                            (lambda ()
                                              ((lambda (k)
                                                 (lambda ()
                                                   (set! abc.0
                                                     (lambda (k) (k 42)))
                                                   (k (void))))
                                                (lambda (v0)
                                                  (lambda ()
                                                    (v k
                                                       (lambda (kv)
                                                         (kv v0)))))))))))
                                     k)))))
                           (lambda (v)
                             (lambda ()
                               ((void)
                                 (lambda (v0)
                                   (lambda ()
                                     (v k (lambda (kv) (kv v0)))))))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

