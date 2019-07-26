(letrec ((factorial (lambda (n total)
                      (if (eq? n '0)
                          total
                          (factorial (add n '-1) (times n total))))))
  (factorial '100 '1))
