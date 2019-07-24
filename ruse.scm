(lambda (log)
   (log (lambda (kk cont.0)
          (lambda () ((lambda (k) (k 21)) kk)))))


(lambda (k)
  ((lambda (k)
     (k (lambda (kk cont.0)
          (lambda ()
            ((lambda (kxx)
               (lambda ()
                 (cont.0
                  (lambda (v)
                    (lambda ()
                      ((lambda (k) (k 42))
                       (lambda (v0)
                         (lambda () (v kxx (lambda (kv) (kv v0)))))))))))
             kk)))))
   (lambda (proc)
     (proc k (lambda (v) (v (lambda (a b c) (pk a) (pk b) (pk c))))))))
;;; ("compiled"
(lambda (k)
  ((lambda (k)
     (k (lambda (kk cont.0)
          (lambda ()
            ((lambda (kxx)
               (lambda ()
                 (cont.0
                  (lambda (v)
                    (lambda ()
                      ((lambda (k) (k 42))
                       (lambda (v0)
                         (lambda ()
                           (v kxx (lambda (kv) (kv v0)))))))))))
             kk)))))
   (lambda (proc)
     (proc
      k
      (lambda (v) (v (lambda (a b c) (pk a) (pk b) (pk c)))))))))
