(let ((abc 42)
      (def 101))
  ((lambda (x) (add x -1)) (add abc (times def 100))))
