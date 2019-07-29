(let ((frob2 (javascript-procedure frob2))
      (v 1))
  (pk (frob2 (javascript-callable (lambda (a b) (pk a) (set! v b) 1337))))
  v)
