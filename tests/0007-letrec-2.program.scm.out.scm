(begin
  (let loop ([thunk ((lambda (k)
                       (lambda ()
                         ((lambda (k)
                            (k (lambda (k abc.1 def.0)
                                 (lambda ()
                                   ((lambda (k)
                                      (lambda ()
                                        ((lambda (k)
                                           (k (lambda (k t.2)
                                                (lambda ()
                                                  ((lambda (k)
                                                     (lambda ()
                                                       ((lambda (k)
                                                          (k (lambda (k
                                                                      t.3)
                                                               (lambda ()
                                                                 ((lambda (k)
                                                                    (lambda ()
                                                                      (abc.1
                                                                        (lambda (v0)
                                                                          (lambda ()
                                                                            (def.0
                                                                              (lambda (v1)
                                                                                (k (add v0
                                                                                        v1)))))))))
                                                                   k)))))
                                                         (lambda (v)
                                                           (lambda ()
                                                             ((lambda (k)
                                                                (lambda ()
                                                                  (set! def.0
                                                                    (lambda (k)
                                                                      (k 5)))
                                                                  (k (void))))
                                                               (lambda (v0)
                                                                 (lambda ()
                                                                   (v k
                                                                      (lambda (kv)
                                                                        (kv v0)))))))))))
                                                    k)))))
                                          (lambda (v)
                                            (lambda ()
                                              ((lambda (k)
                                                 (lambda ()
                                                   (set! abc.1
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
                                     ((void)
                                       (lambda (v1)
                                         (lambda ()
                                           (v k
                                              (lambda (kv) (kv v0))
                                              (lambda (kv)
                                                (kv v1))))))))))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

