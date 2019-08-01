(import (tests))
(import (ruse))
(import (scheme base))


(pk "Ruse Scheme is running...")

(let ((patch! (javascript-procedure patch)))

  (define (%create-app init view)
    ;; TODO: documentation
    (let ((model (init))) ;; init model
      ;; create a procedure that allows to create new green threads
      (letrec (;; lambda used to wrap event callback
               (make-controller (lambda (proc)
                                  (javascript-callable
                                   (lambda (event)
                                     (let ((new ((proc model) event)))
                                       (set! model new)
                                       (render))))))
               ;; rendering pipeline
               (render (lambda ()
                         (patch! (view model make-controller)))))

        ;; change procedure allows to sneak into the app closure
        (lambda (proc)
          (let ((new (proc model)))
            (set! model new)
            (render))))))

  (define (create-app init view)
    (let ((change (%create-app init view)))
      (change (lambda (model) model)) ;; trigger a render
      change))

  ;; app

  (define (onClick model)
    (lambda (event)
      (add model 1)))

  (define (init) 0)

  (define (view model mc)
    `(div
      (@ ("id" "box"))
      "(= count "
      ,model
      ") "
      (button (@ ("onClick" ,(mc onClick)))
              "increment")))

  (create-app init view))
