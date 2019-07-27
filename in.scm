;; (call-with-values (lambda () (values 42 1337))
;;   (lambda (a b)
;;     b))
(letrec ((fact (lambda (n total)
                 (if (eq? n 0)
                     total
                     (fact (add n -1) (times total n))))))
  (fact 2000000 1))
