(call-with-values (lambda () (values 42 1337))
  (lambda (a b)
    b))
