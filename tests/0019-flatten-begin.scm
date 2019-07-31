(import (tests))

(begin
  (pk 0)
  (begin
    (pk 1)
    (begin
      (pk 2)
      (pk 3)))
  (pk 4)
  (begin
    (pk 5)
    (pk 6)
    (begin (pk 7)))
  (pk 8)
  (begin (pk 9)))
