(import (tests))

(letrec ((fact (lambda (n total)
                 (if (eq? n 0)
                     total
                     (fact (add n -1) (times total n))))))
  (fact 100 1))
