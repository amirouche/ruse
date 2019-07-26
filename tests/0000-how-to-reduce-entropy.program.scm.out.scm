(begin
  (let loop ([thunk ((lambda (k) (k 42)) display)])
    (when (procedure? thunk) (loop (thunk))))
  (newline))

