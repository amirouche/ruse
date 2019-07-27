(let ((frob2 (foreign-procedure frob2))
      (v 1))
  (pk (frob2 (foreign-callable (lambda (a b) (pk a) (set! v b) 1337))))
  v)
