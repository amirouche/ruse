(import (tests))
(import (ruse))
(import (scheme base))

(pk "Ruse Scheme is running...")

;; emulate a prompt with call/cc

(define %prompt #f)
(define %escape (cons 'escape '()))

(define (call-with-prompt thunk handler)
  (call-with-values (lambda ()
                      (call/cc
                       (lambda (k)
                         (set! %prompt k)
                         (thunk))))
    (lambda out
      (cond
       ((and (pair? out) (eq? (car out) %escape))
        (apply handler (cdr out)))
       (else (apply values out))))))

(define (abort-to-prompt . args)
  (call/cc
   (lambda (k)
     (let ((prompt %prompt))
       (set! %prompt #f)
       (apply prompt (cons %escape (cons k args)))))))

;;; Commentary
;;
;; TODO: add something insightful
;;

(define (make-node tag options children)
  `(@ (tag . ,tag)
      (options . ,(cons '@ options))
      (children . ,children)))

(define (magic attrs next-identifier)
  ;; shake around the attrs to make them compatible with
  ;; react-hyperscript options, associate callbacks to integer
  ;; identifiers. The event on a given node is associated with an
  ;; integer, the integer is associated with a callback
  ;; procedure. Return both react-hyperscript options and
  ;; integer-to-callback alist named `callbacks`.
  (let loop ((attrs attrs)
             (next-identifier next-identifier)
             (out '())
             (callbacks '()))
    (if (null? attrs)
        (values out callbacks)
        (match attrs
          (((key value) rest ...)
           (if (procedure? value)
               (loop rest
                     (+ 1 next-identifier)
                     (acons key next-identifier out)
                     (acons next-identifier value callbacks))
               (loop rest
                     next-identifier
                     (acons key value out)
                     callbacks)))))))

(define (%sxml->hyperscript+callbacks sxml callbacks)
  ;; TODO: rewrite without match
  (match sxml
    ((? string? string)
     (values string '()))
    ((tag ('@ attrs ...) rest ...)
     (call-with-values (lambda () (magic attrs (length callbacks)))
       (lambda (attrs new-callbacks)
         (let loop ((callbacks (append callbacks new-callbacks))
                    (rest rest)
                    (out '()))
           (if (null? rest)
               (values (make-node tag attrs (reverse out)) callbacks)
               (call-with-values (lambda () (%sxml->hyperscript+callbacks (car rest) callbacks))
                 (lambda (hyperscript new-callbacks)
                   (loop (append callbacks new-callbacks)
                         (cdr rest)
                         (cons hyperscript out)))))))))
    ((tag rest ...)
     ;; there is no magic but almost the same as above loop.
     (let loop ((callbacks callbacks)
                (rest rest)
                (out '()))
       (if (null? rest)
           (values (make-node tag '() (reverse out)) callbacks)
           (call-with-values (lambda () (%sxml->hyperscript+callbacks (car rest) callbacks))
             (lambda (hyperscript callbacks)
               (loop callbacks (cdr rest) (cons hyperscript out)))))))))

(define (sxml->hyperscript+callbacks sxml)
  (%sxml->hyperscript+callbacks sxml '()))

;;; style helpers:
;;
;; make-style: translate css styles to reactjs styles
;;
;; https://css-tricks.com/snippets/css/a-guide-to-flexbox/
;;
;; see ./static/normalize.css
;;

(define (->reactjs symbol)
  (let loop ((chars (string->list (symbol->string symbol)))
             (out '()))
    (if (null? chars)
        (string->symbol (list->string (reverse out)))
        (if (char=? (car chars) #\-)
            (loop (cddr chars) (cons (char-upcase (cadr chars)) out))
            (loop (cdr chars) (cons (car chars) out))))))

(define (%make-style alist)
  (let loop ((alist alist)
             (out '()))
    (if (null? alist)
        out
        (loop (cdr alist) (acons (->reactjs (caar alist)) (cdar alist) out)))))

(define (make-style alist)
  (cons '@ (%make-style alist)))

;; override

(define (%%merge first second)
  (let loop ((second second)
             (out first))
    (if (null? second)
        out
        (loop (cdr second) (set out (caar second) (cdar second))))))

(define (%merge first rest)
  (let loop ((rest rest)
             (out first))
    (if (null? rest)
        out
        (loop (cdr rest) (%%merge out (car rest))))))

(define (merge first second . other)
  (%merge first (cons second other)))

;; inbox handling

(define (recv-from-javascript)
  (json->sexp (string-eval-script "document.scheme_inbox")))

(define (send-to-javascript! obj)
  (eval-script! (string-append "document.javascript_inbox = " (sexp->json obj) ";")))

(define (render! txn)
  (let ((sxml (view txn)))
    (call-with-values (lambda () (sxml->hyperscript+callbacks sxml))
      (lambda (hyperscript callbacks)
        ;; TODO: FIXME
        (send-to-javascript! (list "patch" hyperscript))
        callbacks))))

(define (xhr method path obj)
  (abort-to-prompt (list "xhr" (list method path obj))))

;; TODO: no need to map callbacks to integers, use javascript callable
;; instead.
(define (update model callbacks event)
  (let* ((event* event)
         (identifier (ref event* 'identifier)))
    (let ((callback (ref callbacks identifier)))
      (okvs-in-transaction model (lambda (txn) (callback txn event*)))
      model)))

(define (create-app init view)
  (let ((model (okvs 'in-memory)))
    (okvs-in-transaction model (lambda (txn) (init txn)))
    (let loop1 ()
      ;; TODO: remove okvs for the time being
      (let ((callbacks (okvs-in-transaction model (lambda (txn) (render! txn)))))
        (wait-on-event!) ;; yields control back to the browser
        (let loop2 ((event (recv-from-javascript))
                    (k #f))
          (cond
           ((and (string=? (car event) "xhr") k)
            (k (cadr event)))
           ((and (string=? (car event) "xhr") (not k))
            (error "Oops! Should not happen"))
           ((string=? (car event) "event")
            (when k
              (pk "User, your wish is my command!..."))
            (call-with-prompt
             (lambda ()
               (let ((new-model (update model callbacks (cadr event))))
                 (set! model new-model)
                 (loop1)))
             (lambda (k obj)
               (send-to-javascript! obj)
               (wait-on-event!)
               (loop2 (recv-from-javascript) k))))))))))

;; app



;; everything that follows is dead code
