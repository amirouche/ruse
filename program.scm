(begin
  (let loop ([thunk ((lambda (k)
                       ((lambda (k)
                          (k (lambda (k cont.0)
                               ((lambda (k)
                                  (lambda ()
                                    ((lambda (k)
                                       (k (lambda (k t.1)
                                            ((lambda (k) (k 42)) k))))
                                      (lambda (v)
                                        (lambda ()
                                          ((lambda (k) (k 0))
                                            (lambda (v0)
                                              (lambda ()
                                                (v k
                                                   (lambda (kv)
                                                     (kv v0)))))))))))
                                 k))))
                         (lambda (proc)
                           (proc
                             k
                             (lambda (v) (v (lambda (a b c) (b k))))))))
                      display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

