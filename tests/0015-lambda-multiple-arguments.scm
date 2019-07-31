(import (tests))


(let ((proc (lambda (a b c) (add (add a b) c))))
  (proc 40 1 1))
