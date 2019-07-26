(let ((input 42))
  (letrec ((odd? (lambda (x) (if (eq? x 0) 0 (even? (add x -1)))))
           (even? (lambda (x) (if (eq? x 0) 1 (odd? (add x -1))))))
    (odd? input)))
