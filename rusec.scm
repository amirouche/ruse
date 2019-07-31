;;; Copyright (c) 2013 Andrew W. Keep
;;; Copyright (c) 2019 Amirouche Boubekki
;;;
;;; See LICENSE for details.
;;;
(import (chezscheme)
        (nanopass)
        (matchable))

(define (pk . args)
  (display ";;; " (current-error-port))
  (pretty-print args (current-error-port))
  (newline (current-error-port))
  (car (reverse args)))

;; Helper function for representing unique variables as symbols by adding a
;; number to the variables (so if we start with f we get f.n where n might
;; be 1, 2, 3, etc, and is unique).
(define unique-var
  (let ()
    (define count 0)
    (lambda (name)
      (let ([c count])
        (set! count (+ count 1))
        (string->symbol
         (string-append (symbol->string name) "." (number->string c)))))))

;; strip the numberic bit back off the unique-var
(define base-var
  (lambda (x)
    (define s0
      (lambda (rls)
        (if (null? rls)
            (error 'base-var "not a unique-var created variable" x)
            (let ([c (car rls)])
              (cond
               [(char-numeric? c) (s1 (cdr rls))]
               [else (error 'base-var
                            "not a unique-var created variable" x)])))))
    (define s1
      (lambda (rls)
        (if (null? rls)
            (error 'base-var "not a unique-var created variable" x)
            (let ([c (car rls)])
              (cond
               [(char-numeric? c) (s1 (cdr rls))]
               [(char=? c #\.) (cdr rls)]
               [else (error 'base-var
                            "not a unique-var created variable" x)])))))
    (string->symbol
     (list->string
      (reverse
       (s0 (reverse (string->list (symbol->string x)))))))))


;; Convenience procedure for building temporaries in the compiler.
(define make-tmp (lambda () (unique-var 't)))

;; user value primitives that perform allocation
(define user-alloc-value-prims
  '((void . 0) ($primitive . 2) (call/cc . 1) (pk . 1) (call/cc . 1) (times . 2) (add . 2) (cons . 2) (make-vector . 1) (box . 1)))

;; user value primitives that do not perform allocation
(define user-non-alloc-value-prims
  '((car . 1) (cdr . 1) (vector-ref . 2) (vector-length . 1) (unbox . 1)
    (+ . 2) (- . 2) (* . 2) (/ . 2)))

;; user predicate primitives
;; TODO: add procedure?
(define user-pred-prims
  '((pair? . 1) (null? . 1) (boolean? . 1) (vector? . 1) (box? . 1) (= . 2)
    (< . 2) (<= . 2) (> . 2) (>= . 2) (eq? . 2)))

;; user effect primitives
(define user-effect-prims
  '((vector-set! . 3) (set-box! . 2)))

;; an association list with the user primitives
(define user-prims
  (append user-alloc-value-prims user-non-alloc-value-prims user-pred-prims
          user-effect-prims))

;; void primitive + non-allocation user value primitives
(define void+user-non-alloc-value-prims
  (cons '(void . 0) user-non-alloc-value-prims))

;; an association list with void and all the user primitives
(define void+user-prims
  (append user-alloc-value-prims void+user-non-alloc-value-prims
          user-pred-prims user-effect-prims))

;; all the allocation value primitives, including make-closure primitive
(define closure+user-alloc-value-prims
  (cons '(make-closure . 1) user-alloc-value-prims))

;; all the non-allocation value primitives, include the closure primitives
(define closure+void+user-non-alloc-value-prims
  (cons* '(closure-code . 2) '(closure-ref . 2)
         void+user-non-alloc-value-prims))

;; all the user effect primitives with the closure primitives
(define closure+user-effect-prims
  (cons* '(closure-code-set! . 2) '(closure-data-set! . 3)
         user-effect-prims))

;; all the user effect primitives, closure primitives, and internal primitives
(define internal+closure+user-effect-prims
  (cons* '($vector-length-set! . 2) '($set-car! . 2) '($set-cdr! . 2)
         closure+user-effect-prims))

;; association list including all prims except the three final internal
;; primitives
(define closure+void+user-prims
  (append closure+user-alloc-value-prims
          closure+void+user-non-alloc-value-prims user-pred-prims
          closure+user-effect-prims))

;; various predicates for determining if a primitve is a valid prim.
(define primitive?
  (lambda (x)
    (assq x user-prims)))

(define void+primitive?
  (lambda (x)
    (assq x void+user-prims)))

(define closure+void+primitive?
  (lambda (x)
    (assq x closure+void+user-prims)))

(define effect-free-prim?
  (lambda (x)
    (assq x (append void+user-non-alloc-value-prims user-alloc-value-prims
                    user-pred-prims))))

(define predicate-primitive?
  (lambda (x)
    (assq x user-pred-prims)))

(define effect-primitive?
  (lambda (x)
    (assq x closure+user-effect-prims)))

(define value-primitive?
  (lambda (x)
    (assq x (append closure+user-alloc-value-prims
                    closure+void+user-non-alloc-value-prims))))

(define non-alloc-value-primitive?
  (lambda (x)
    (assq x closure+void+user-non-alloc-value-prims)))

(define effect+internal-primitive?
  (lambda (x)
    (assq x internal+closure+user-effect-prims)))

  ;;;;;;;
;; Helper functions for identifying terminals in the nanopass languages.

;; determine if we have a 61-bit signed integer
(define target-fixnum?
  (lambda (x)
    (and (and (integer? x) (exact? x))
         (<= (- (expt 2 60)) x (- (expt 2 60) 1)))))

;; determine if we have a constant: #t, #f, '(), or 61-bit signed integer.
(define constant?
  (lambda (x)
    (or (symbol? x) (string? x) (number? x) (boolean? x) (null? x))))

;; determine if we have a valid datum (a constant, a pair of datum, or a
;; vector of datum)
(define datum?
  (lambda (x)
    (or (constant? x)
        (and (pair? x) (datum? (car x)) (datum? (cdr x)))
        (and (vector? x)
             (let loop ([i (vector-length x)])
               (or (fx=? i 0)
                   (let ([i (fx- i 1)])
                     (and (datum? (vector-ref x i))
                          (loop i)))))))))

;; determine if we have a 64-bit signed integer (used later in the compiler
;; to hold the ptr representation).
(define integer-64?
  (lambda (x)
    (and (and (integer? x) (exact? x))
         (<= (- (expt 2 63)) x (- (expt 2 63) 1)))))

;; Random helper available on most Scheme systems, but irritatingly not in
;; the R6RS standard.
(define make-list
  (case-lambda
    [(n) (make-list n (if #f #f))]
    [(n v) (let loop ([n n] [ls '()])
             (if (zero? n)
                 ls
                 (loop (fx- n 1) (cons v ls))))]))

  ;;;;;;
;; The standard (not very efficient) Scheme representation of sets as lists

;; add an item to a set
(define set-cons
  (lambda (x set)
    (if (memq x set)
        set
        (cons x set))))

;; construct the intersection of 0 to n sets
(define intersect
  (lambda set*
    (if (null? set*)
        '()
        (fold-left (lambda (seta setb)
                     (let loop ([seta seta] [fset '()])
                       (if (null? seta)
                           fset
                           (let ([a (car seta)])
                             (if (memq a setb)
                                 (loop (cdr seta) (cons a fset))
                                 (loop (cdr seta) fset))))))
                   (car set*) (cdr set*)))))

;; construct the union of 0 to n sets
(define union
  (lambda set*
    (if (null? set*)
        '()
        (fold-left (lambda (seta setb)
                     (let loop ([setb setb] [seta seta])
                       (if (null? setb)
                           seta
                           (loop (cdr setb) (set-cons (car setb) seta)))))
                   (car set*) (cdr set*)))))

;; construct the difference of 0 to n sets
(define difference
  (lambda set*
    (if (null? set*)
        '()
        (fold-right (lambda (setb seta)
                      (let loop ([seta seta] [final '()])
                        (if (null? seta)
                            final
                            (let ([a (car seta)])
                              (if (memq a setb)
                                  (loop (cdr seta) final)
                                  (loop (cdr seta) (cons a final)))))))
                    (car set*) (cdr set*)))))

;; Language definitions for Lsrc and L1 to L22
;; Both the language extension and the fully specified language is included
;; (though the fully specified language may be out of date).  This can be
;; regenerated by doing:
;; > (import (c))
;; > (import (nanopass))
;; > (language->s-expression L10) => generates L10 definition
(define-language Lsrc
  (terminals
   (symbol (x))
   (primitive (pr))
   (constant (c))
   (datum (d)))
  (Expr (e body)
        pr
        x
        c
        (quote d)
        (values e* ...)
        (define x e)
        (javascript-procedure x)
        (javascript-callable e0)
        (call-with-values e0 e1)
        (if e0 e1)
        (if e0 e1 e2)
        (or e* ...)
        (and e* ...)
        (not e)
        (begin e* ... e)
        (lambda (x* ...) body* ... body)
        (lambda-variadic x body* ... body)
        (let ([x* e*] ...) body* ... body)
        (letrec ([x* e*] ...) body* ... body)
        (letrec* ([x* e*] ...) body* ... body)
        (set! x e)
        (e e* ...)))

;; Language 1: removes one-armed if and adds the void primitive
                                        ;
                                        ; (define-language L1
                                        ;   (terminals (void+primitive (pr))
                                        ;     (symbol (x))
                                        ;     (constant (c))
                                        ;     (datum (d)))
                                        ;   (Expr (e body)
                                        ;     pr
                                        ;     x
                                        ;     c
                                        ;     (quote d)
                                        ;     (if e0 e1 e2)
                                        ;     (or e* ...)
                                        ;     (and e* ...)
                                        ;     (not e)
                                        ;     (begin e* ... e)
                                        ;     (lambda (x* ...) body* ... body)
                                        ;     (let ([x* e*] ...) body* ... body)
                                        ;     (letrec ([x* e*] ...) body* ... body)
                                        ;     (set! x e)
                                        ;     (e e* ...)))
                                        ;
(define-language L1
  (extends Lsrc)
  (terminals
   (- (primitive (pr)))
   (+ (void+primitive (pr))))
  (Expr (e body)
        (- (if e0 e1))))

;; Language 2: removes or, and, and not forms
                                        ;
                                        ; (define-language L2
                                        ;   (terminals (void+primitive (pr))
                                        ;     (symbol (x))
                                        ;     (constant (c))
                                        ;     (datum (d)))
                                        ;   (Expr (e body)
                                        ;     pr
                                        ;     x
                                        ;     c
                                        ;     (quote d)
                                        ;     (if e0 e1 e2)
                                        ;     (begin e* ... e)
                                        ;     (lambda (x* ...) body* ... body)
                                        ;     (let ([x* e*] ...) body* ... body)
                                        ;     (letrec ([x* e*] ...) body* ... body)
                                        ;     (set! x e)
                                        ;     (e e* ...)))
                                        ;
(define-language L2
  (extends L1)
  (Expr (e body)
        (- (or e* ...)
           (and e* ...)
           (not e))))

;; Language 3: removes multiple expressions from the body of
;; lambda, let, and letrec (to be replaced with a single begin
;; expression that contains the expressions from the body).
                                        ;
                                        ; (define-language L3
                                        ;   (terminals (void+primitive (pr))
                                        ;     (symbol (x))
                                        ;     (constant (c))
                                        ;     (datum (d)))
                                        ;   (Expr (e body)
                                        ;     (letrec ([x* e*] ...) body)
                                        ;     (let ([x* e*] ...) body)
                                        ;     (lambda (x* ...) body)
                                        ;     pr
                                        ;     x
                                        ;     c
                                        ;     (quote d)
                                        ;     (if e0 e1 e2)
                                        ;     (begin e* ... e)
                                        ;     (set! x e)
                                        ;     (e e* ...)))
                                        ;
(define-language L3
  (extends L2)
  (Expr (e body)
        (- (lambda (x* ...) body* ... body)
           (let ([x* e*] ...) body* ... body)
           (letrec ([x* e*] ...) body* ... body))
        (+ (lambda (x* ...) body)
           (let ([x* e*] ...) body)
           (letrec ([x* e*] ...) body))))

(define-language L4
  (extends L3)
  (Expr (e body)
        (- (letrec ([x* e*] ...) body))))

(define-language L5
  (extends L4)
  (Expr (e body)
        (- (begin e* ... e))))

(define-language L6
  (extends L5)
  (Expr (e body)
        (- (let ([x* e*] ...) body))))

(define-pass parse-and-rename : * (e) -> Lsrc ()
  ;; Helper functions for this pass.
  (definitions
    ;; process-body - used to process the body of begin, let, letrec, and
    ;; lambda expressions.  since all four of these have the same pattern in
    ;; the body.
    (define process-body
      (lambda (who env body* f)
        (when (null? body*) (error who "invalid empty body"))
        (let loop ([body (car body*)] [body* (cdr body*)] [rbody* '()])
          (if (null? body*)
              (f (reverse rbody*) (Expr body env))
              (loop (car body*) (cdr body*)
                    (cons (Expr body env) rbody*))))))
    ;; vars-unique? - processes the list of bindings to make sure all of the
    ;; variable names are different (i.e. we don't want to allow
    ;; (lambda (x x) x), since we would not know which x is which).
    (define vars-unique?
      (lambda (fmls)
        (let loop ([fmls fmls])
          (or (null? fmls)
              (and (not (memq (car fmls) (cdr fmls)))
                   (loop (cdr fmls)))))))
    ;; unique-vars - builds a list of unique variables based on a set of
    ;; formals and extends the environment.  it takes a function as an
    ;; argument (effectively a continuation), and passes it the updated
    ;; environment and a list of unique variables.
    (define unique-vars
      (lambda (env fmls f)
        (unless (vars-unique? fmls)
          (error 'unique-vars "invalid formals" fmls))
        (let loop ([fmls fmls] [env env] [rufmls '()])
          (if (null? fmls)
              (f env (reverse rufmls))
              (let* ([fml (car fmls)] [ufml (unique-var fml)])
                (loop (cdr fmls) (cons (cons fml ufml) env)
                      (cons ufml rufmls)))))))
    ;; process-bindings - processes the bindings of a let or letrec and
    ;; produces bindings for unique variables for each of the original
    ;; variables.  it also processes the right-hand sides of the variable
    ;; bindings and selects either the original environment (for let) or the
    ;; updated environment (for letrec).
    (define process-bindings
      (lambda (rec? env bindings f)
        (let loop ([bindings bindings] [rfml* '()] [re* '()])
          (if (null? bindings)
              (unique-vars env rfml*
                           (lambda (new-env rufml*)
                             (let ([env (if rec? new-env env)])
                               (let loop ([rufml* rufml*]
                                          [re* re*]
                                          [ufml* '()]
                                          [e* '()])
                                 (if (null? rufml*)
                                     (f new-env ufml* e*)
                                     (loop (cdr rufml*) (cdr re*)
                                           (cons (car rufml*) ufml*)
                                           (cons (Expr (car re*) env) e*)))))))
              (let ([binding (car bindings)])
                (loop (cdr bindings) (cons (car binding) rfml*)
                      (cons (cadr binding) re*)))))))
    ;; Expr* - helper to process a list of expressions.
    (define Expr*
      (lambda (e* env)
        (map (lambda (e) (Expr e env)) e*)))
    ;; with-output-language rebinds quasiquote so that it will build
    ;; language records.
    (with-output-language (Lsrc Expr)
                          ;; build-primitive - this is a helper function to build entries in the
                          ;; initial environment for our user primitives.  the initial
                          ;; enviornment contains a mapping of keywords and primitives to
                          ;; processing functions that check their arity (in the case of
                          ;; primitives) or their forms (in the case of keywords).  These are
                          ;; put into an environment, because keywords and primitives can be
                          ;; rebound.  (i.e. (lambda (lambda) (lambda lambda)) is a perfectly
                          ;; valid function in Scheme that takes a function as an argument and
                          ;; applies the argument to itself).
                          (define build-primitive
                            (lambda (as)
                              (let ([name (car as)] [argc (cdr as)])
                                (cons name
                                      (if (< argc 0)
                                          (error who
                                                 "primitives with arbitrary counts are not currently supported"
                                                 name)
                                          ;; we'd love to support arbitrary argument lists, but we'd
                                          ;; need to either:
                                          ;;   1. get rid of raw primitives, or
                                          ;;   2. add function versions of our raw primitives with
                                          ;;      arbitrary arguments, or (possibly and)
                                          ;;   3. add general handling for functions with arbitrary
                                          ;;      arguments. (i.e. support for (lambda args <body>)
                                          ;;      or (lambda (x y . args) <body>), which we don't
                                          ;;      currently support.
                                          #;(let ([argc (bitwise-not argc)])
                                          (lambda (env . e*)
                                          (if (>= (length e*) argc)
                                          `(,name ,(Expr* e* env) ...)
                                          (error name "invalid argument count"
                                          (cons name e*)))))
                                          (lambda (env . e*)
                                            (if (= (length e*) argc)
                                                `(,name ,(Expr* e* env) ...)
                                                (error name "invalid argument count"
                                                       (cons name e*)))))))))
                          ;; initial-env - this is our initial environment, expressed as an
                          ;; association list of keywords and primitives (represented as
                          ;; symbols) to procedure handlers (represented as procedures).  As the
                          ;; program is processed through this pass, it will be extended with
                          ;; local bidings from variables (represented as symbols) to unique
                          ;; variables (represented as symbols with a format of symbol.number).
                          (define initial-env
                            (cons*
                             (cons 'quote (lambda (env d)
                                            (unless (datum? d)
                                              (error 'quote "invalid datum" d))
                                            `(quote ,d)))
                             (cons 'if (case-lambda
                                         [(env e0 e1) `(if ,(Expr e0 env) ,(Expr e1 env))]
                                         [(env e0 e1 e2)
                                          `(if ,(Expr e0 env) ,(Expr e1 env) ,(Expr e2 env))]
                                         [x (error 'if (if (< (length x) 3)
                                                           "too few arguments"
                                                           "too many arguments")
                                                   x)]))
                             (cons 'or (lambda (env . e*) `(or ,(Expr* e* env) ...)))
                             (cons 'and (lambda (env . e*) `(and ,(Expr* e* env) ...)))
                             (cons 'not (lambda (env e) `(not ,(Expr e env))))
                             (cons 'begin (lambda (env . e*)
                                            (process-body 'begin env e*
                                                          (lambda (e* e)
                                                            `(begin ,e* ... ,e)))))
                             (cons 'values (lambda (env . e*)
                                             (process-body 'values env e*
                                                           (lambda (e* e)
                                                             `(values ,e* ... ,e)))))
                             (cons 'define (lambda (env x e)
                                             (process-bindings #f env (list (list x e))
                                                               (lambda (env x* e*)
                                                                 `(define ,(car x*) ,(car e*))))))
                             (cons 'javascript-procedure (lambda (env x)
                                                           `(javascript-procedure ,x)))
                             (cons 'javascript-callable (lambda (env e)
                                                          `(javascript-callable ,(Expr e env))))
                             (cons 'call-with-values (lambda (env producer consumer)
                                                       `(call-with-values ,(Expr producer env)
                                                          ,(Expr consumer env))))
                             (cons 'lambda (lambda (env fmls . body*)
                                             (if (symbol? fmls)
                                                 (unique-vars env (list fmls)
                                                              (lambda (env fmls)
                                                                (process-body 'lambda-variadic env body*
                                                                              (lambda (body* body)
                                                                                `(lambda-variadic ,(car fmls)
                                                                                                  ,body* ... ,body)))))
                                                 (unique-vars env fmls
                                                              (lambda (env fmls)
                                                                (process-body 'lambda env body*
                                                                              (lambda (body* body)
                                                                                `(lambda (,fmls ...)
                                                                                   ,body* ... ,body))))))))
                             (cons 'let (lambda (env bindings . body*)
                                          (process-bindings #f env bindings
                                                            (lambda (env x* e*)
                                                              (process-body 'let env body*
                                                                            (lambda (body* body)
                                                                              `(let ([,x* ,e*] ...) ,body* ... ,body)))))))
                             (cons 'letrec (lambda (env bindings . body*)
                                             (process-bindings #t env bindings
                                                               (lambda (env x* e*)
                                                                 (process-body 'letrec env body*
                                                                               (lambda (body* body)
                                                                                 `(letrec ([,x* ,e*] ...)
                                                                                    ,body* ... ,body)))))))

                             (cons 'letrec* (lambda (env bindings . body*)
                                              (process-bindings #t env bindings
                                                                (lambda (env x* e*)
                                                                  (process-body 'letrec env body*
                                                                                (lambda (body* body)
                                                                                  `(letrec ([,x* ,e*] ...)
                                                                                     ,body* ... ,body)))))))

                             (cons 'set! (lambda (env x e)
                                           (cond
                                            [(assq x env) =>
                                             (lambda (as)
                                               (let ([v (cdr as)])
                                                 (if (symbol? v)
                                                     `(set! ,v ,(Expr e env))
                                                     (error 'set! "invalid syntax"
                                                            (list 'set! x e)))))]
                                            [else (error 'set! "set to unbound variable"
                                                         (list 'set! x e))])))
                             (map build-primitive user-prims)))
                          ;; App - helper for handling applications.
                          (define App
                            (lambda (e env)
                              (let ([e (car e)] [e* (cdr e)])
                                `(,(Expr e env) ,(Expr* e* env) ...))))))
  ;; transformer: Expr: S-expression -> LSrc:Expr (or error)
  ;;
  ;; parses an S-expression, looking for a pair (which indicates, a
  ;; keyword use, a primitive call, or a normal function call), a symbol
  ;; (which indicates a variable reference or a primitive reference), or one of
  ;; our constants (which indicates a raw constant).
  (Expr : * (e env) -> Expr ()
        (cond
         [(pair? e)
          (cond
           [(assq (car e) env) =>
            (lambda (as)
              (let ([v (cdr as)])
                (if (procedure? v)
                    (apply v env (cdr e))
                    (App e env))))]
           [(and (list? e) (pair? (car e)) (eq? (caar e) '$primitive))
            (cond
             [(eq? (caddar e) '$set-top-level-value!)
              (apply (cdr (assq 'set! env)) env (list (cadadr e) (caddr e)))]
             [(eq? (caddar e) 'eq?)
              (apply (cdr (assq 'eq? env)) env (cdr e))]
             [(eq? (caddar e) 'call/cc)
              (apply (cdr (assq 'call/cc env)) env (cdr e))]
             [(eq? (caddar e) 'call-with-values)
              (apply (cdr (assq 'call-with-values env)) env (cdr e))]
             [(eq? (caddar e) 'values)
              (apply (cdr (assq 'values env)) env (cdr e))]
             [(eq? (caddar e) 'void)
              (App '(void) env)]
             [else (error 'ruse "chez primitive oops" e)])]
           [else (App e env)])]
         [(symbol? e)
          (cond
           [(assq e env) =>
            (lambda (as)
              (let ([v (cdr as)])
                (cond
                 [(symbol? v) v]
                 [(primitive? e) e]
                 [else (error who "invalid syntax" e)])))]
           [else (write e)(error 'rusec "unbound variable" e)])]
         [(constant? e) `(quote ,e)]
         [else (error who "invalid expression" e)]))
  ;; kick off processing the S-expression by handing Expr our initial
  ;; S-expression and the initial environment.
  (Expr e initial-env))

(define-pass flatten-begin : Lsrc (e) -> Lsrc ()
  (Expr : Expr (e) -> Expr ()
        [(begin ,[e0*] ... ,[e0])
         (let loop ((e0* e0*)
                    (out '()))
           (if (null? e0*)
               (nanopass-case (Lsrc Expr) e0
                              [(begin ,e1* ... ,e1)
                               `(begin ,(reverse out) ... ,e1* ... ,e1)]
                              [else `(begin ,(reverse out) ... ,e0)])
               (nanopass-case (Lsrc Expr) (car e0*)
                              [(begin ,e1* ... ,e1)
                               (loop (cdr e0*) (append (list e1) (reverse e1*) out))]
                              [else
                               (loop (cdr e0*) (cons (car e0*) out))])))]))

;; pass: remove-one-armed-if : Lsrc -> L1
;;
;; this pass replaces the (if e0 e1) form with an if that will explicitly
;; produce a void value when the predicate expression returns false. In
;; other words:
;; (if e0 e1) => (if e0 e1 (void))
;;
;; Design descision: kept seperate from parse-and-rename to make it easier
;; to understand how the nanopass framework can be used.
;;
(define-pass remove-one-armed-if : Lsrc (e) -> L1 ()
  (Expr : Expr (e) -> Expr ()
        [(if ,[e0] ,[e1]) `(if ,e0 ,e1 (void))]))

;; pass: remove-and-or-not : L1 -> L2
;;
;; this pass looks for references to and, or, and not and replaces it with
;; the appropriate if expressions.  this pass follows the standard
;; expansions and has one small optimization:
;;
;; (if (not e0) e1 e2) => (if e0 e2 e1)           [optimization]
;; (and)               => #t                      [from Scheme standard]
;; (or)                => #f                      [from Scheme standard]
;; (and e e* ...)      => (if e (and e* ...) #f)  [standard expansion]
;; (or e e* ...)       => (let ([t e])            [standard expansion -
;;                          (if t t (or e* ...)))  avoids computing e twice]
;;
;; Design decision: again kept separate from parse-and-rename to simplify
;; the discussion of this pass (adding it to parse-and-rename doesn't really
;; make parse-and-rename much more complicated, and if we had a macro
;; system, which would likely be implemented in parse-and-rename, or before
;; it, we would probably want and, or, and not defined as macros, rather
;; than forms in the language, in which case this pass would be
;; unnecessary).
;;
(define-pass remove-and-or-not : L1 (e) -> L2 ()
  (Expr : Expr (e) -> Expr ()
        [(if (not ,[e0]) ,[e1] ,[e2]) `(if ,e0 ,e2 ,e1)]
        [(not ,[e0]) `(if ,e0 '#f '#t)]
        [(and) '#t]
        [(and ,[e] ,[e*] ...)
         ;; tiny inline loop (not tail recursive, so called f instead of loop)
         (let f ([e e] [e* e*])
           (if (null? e*)
               e
               `(if ,e ,(f (car e*) (cdr e*)) '#f)))]
        [(or) '#f]
        [(or ,[e] ,[e*] ...)
         ;; tiny inline loop (not tail recursive, so called f instead of loop)
         (let f ([e e] [e* e*])
           (if (null? e*)
               e
               (let ([t (make-tmp)])
                 `(let ([,t ,e]) (if ,t ,t ,(f (car e*) (cdr e*)))))))]))

;; pass: make-begin-explicit : L2 -> L3
;;
;; this pass takes the L2 let, letrec, and lambda expressions (which have
;; bodies that can contain more than one expression), and converts them into
;; bodies with a single expression, wrapped in a begin if necessary.  To
;; avoid polluting the output with extra begins that contain only one
;; expression the build-begin helper checks to see if there is more then one
;; expression and if there is builds a begin.
;;
;; Effectively this does the following:
;; (let ([x* e*] ...) body0 body* ... body1) =>
;;   (let ([x* e*] ...) (begin body0 body* ... body1))
;; (letrec ([x* e*] ...) body0 body* ... body1) =>
;;   (letrec ([x* e*] ...) (begin body0 body* ... body1))
;; (lambda (x* ...) body0 body* ... body1) =>
;;   (lambda (x* ...) (begin body0 body* ... body1))
;;
;; Design Decision: This could have been included with rename-and-parse,
;; without making it significantly more compilicated, but was separated out
;; to continue with simpler nanopass passes to help make it more obvious
;; what is going on here.
;;
(define-pass make-begin-explicit : L2 (e) -> L3 ()
  (Expr : Expr (e) -> Expr ()
        ;; Note: the defitions are within the body of the Expr transformer
        ;; instead of being within the body of the pass.  This means the
        ;; quasiquote is bound to the Expr form, and we don't need to use
        ;; with-output-language.
        (definitions
          ;; build-begin - helper function to build a begin only when the body
          ;; contains more then one expression.  (this version of the helper
          ;; is a little over-kill, but it makes our traces look a little
          ;; cleaner.  there should be a simpler way of doing this.)
          (define build-begin
            (lambda (e* e)
              (nanopass-case (L3 Expr) e
                             [(begin ,e1* ... ,e)
                              (build-begin (append e* e1*) e)]
                             [else
                              (if (null? e*)
                                  e
                                  (let loop ([e* e*] [re* '()])
                                    (if (null? e*)
                                        `(begin ,(reverse re*) ... ,e)
                                        (let ([e (car e*)])
                                          (nanopass-case (L3 Expr) e
                                                         [(begin ,e0* ... ,e0)
                                                          (loop (append e0* (cons e0 (cdr e*))) re*)]
                                                         [else (loop (cdr e*) (cons (car e*) re*))])))))]))))
        [(let ([,x* ,[e*]] ...) ,[body*] ... ,[body])
         `(let ([,x* ,e*] ...) ,(build-begin body* body))]
        [(letrec ([,x* ,[e*]] ...) ,[body*] ... ,[body])
         `(letrec ([,x* ,e*] ...) ,(build-begin body* body))]
        [(lambda (,x* ...) ,[body*] ... ,[body])
         `(lambda (,x* ...) ,(build-begin body* body))]
        [(lambda-variadic ,x ,[body*] ... ,[body])
         `(lambda-variadic ,x ,(build-begin body* body))]))


;; a little helper mostly shamelesly stolen from
;; the Chez Scheme User's Guide
(define-syntax with-implicit
  (syntax-rules ()
    [(_ (tid id ...) body0 ... body1)
     (with-syntax ([id (datum->syntax #'tid 'id)] ...)
       body0 ... body1)]))

;; a little macro to make building a compiler with tracing that we can turn
;; off and on easier.  no support for looping in this, but the syntax is very
;; simple:
;; (define-compiler my-compiler-name
;;   (pass1 unparser)
;;   (pass2 unparser)
;;   ...
;;   pass-to-generate-c)
;;
(define-syntax define-compiler
  (lambda (x)
    (syntax-case x ()
      [(_ name (pass unparser) ... gen-c)
       (with-implicit (name all-passes trace-passes)
                      #`(begin
                          (define all-passes '(pass ... gen-c))
                          (define trace-passes
                            (let ([passes '()])
                              (case-lambda
                                [() passes]
                                [(x)
                                 (cond
                                  [(symbol? x)
                                   (unless (memq x all-passes)
                                     (error 'trace-passes "invalid pass name" x))
                                   (set! passes (list x))]
                                  [(list? x)
                                   (unless (for-all (lambda (x) (memq x all-passes)) x)
                                     (error 'trace-passes
                                            "one or more invalid pass names" x))
                                   (set! passes x)]
                                  [(eq? x #t) (set! passes all-passes)]
                                  [(eq? x #f) (set! passes '())]
                                  [else (error 'trace-passes
                                               "invalid pass specifier" x)])])))
                          (define name
                            (lambda (x)
                              #,(let loop ([pass* #'(pass ...)]
                                           [unparser* #'(unparser ...)])
                                  (if (null? pass*)
                                      #'(begin
                                          (gen-c x))
                                      (with-syntax ([pass (car pass*)]
                                                    [unparser (car unparser*)])
                                        #`(let ([x (pass x)])
                                            (when (memq 'pass (trace-passes))
                                              (printf "output of pass ~s~%" 'pass)
                                              (pretty-print (unparser x)))
                                            #,(loop (cdr pass*)
                                                    (cdr unparser*))))))))))])))


(define-pass letrec-as-let-and-set : L3 (e) -> L4 ()
  (Expr : Expr (e) -> Expr ()
        [(letrec ([,x ,[e]]) ,[body])
         `(let ((,x (void)))
            (begin
              (set! ,x ,e)
              ,body))]
        [(letrec ([,x* ,[e*]] ...) ,[body])
         (let ((void* (map (lambda _ `(void)) x*)))
           `(let ([,x* ,void*] ...)
              (begin [set! ,x* ,e*] ...
                     ,body)))]))

(define-pass
  begin-as-let : L4 (e) -> L5 ()
  (Expr : Expr (e) -> Expr ()
        [(begin ,[e*] ... ,[e])
         (let f ((e* e*))
           (if (null? e*)
               e
               `(let ((,(make-tmp) ,(car e*)))
                  ,(f (cdr e*)))))]))

(define-pass let-as-lambda : L5 (e) -> L6 ()
  (Expr : Expr (e) -> Expr ()
        [(let ([,x* ,[e*]] ...) ,[body])
         `((lambda (,x* ...) ,body) ,e* ...)]))

(define-pass
  cps-trampoline : L6 (e) -> L6 ()
  (Expr : Expr (e) -> Expr ()

        [(quote ,d)
         (unless (constant? d)
           (error 'ruse "cps-trampoline doesn't support complex datum, yet!" d))
         (cond
          ((or (number? d) (string? d))
           `(lambda (k) (k ,d)))
          ((symbol? d)
           `(lambda (k)
              (k (ruse-symbol-get-or-create ,(symbol->string d)))))
          ((null? d)
           '())
          (else (error 'ruse "oops")))]

        [(set! ,x ,[e])
         `(lambda (k)
            (,e (lambda (v)
                  (set! ,x (lambda (k) (k v)))
                  (k (void)))))]

        ;; if branch
        [(if ,[e0] ,[e1] ,[e2])
         `(lambda (k)
            (,e0
             (lambda (kif)
               (if kif
                   (,e1 k)
                   (,e2 k)))))]

        ;; TODO: FIXME: prolly broken, need unwrap e*
        [(lambda () (values ,[e*] ...))
         `(lambda (k)
            (lambda () (k ,e* ...)))]

        ;; [(lambda (,x* ...) (values ,[e*] ...))
        ;;  (lambda (k)
        ;;    (lambda (k ,x* ...)
        ;;      (lambda ()
        ;;        (k ,e* ....)))]

        [(javascript-procedure ,x)
         (let ((args (make-tmp)))
           `(lambda (k)
              (k (lambda ,args
                   (let k (shift ,args))
                   (k (apply2 ,x ,args))))))]

        [(javascript-callable ,[e0])
         (let ((args (make-tmp)))
           `(lambda (k)
              (k (lambda ,args
                   (set! ,args (map wrap ,args))
                   (prepend returnk ,args)
                   (trampoline (apply (,e0 returnk) ,args))))))]

        ;; lambda creation
        [(lambda (,x* ...) ,[body])
         `(lambda (k)
            (k (lambda (k ,x* ...)
                 (,body k))))]

        ;; lambda creation
        [(lambda (,x* ...) ,[body])
         `(lambda (k)
            (k (lambda (k ,x* ...)
                 (,body k))))]

        [(lambda-variadic ,x ,[body])
         (let ((args (make-tmp)))
           `(lambda (k)
              (k (lambda (k)
                   ;; convert javascript `arguments` into x formal
                   (set! ,x (ruse_arguments_to_list arguments))
                   (,body k)))))]


        ;; call-with-values
        [(call-with-values ,[e0] ,[e1])
         (let ((args (make-tmp)))
           `(lambda (k)
              (,e0 (lambda ,args
                     (,e1 (lambda (v1)
                            (apply v1 (prepend k ,args))))))))]

        ;; primitive application
        [(,pr ,[e0] ,[e1])
         `(lambda (k)
            (,e0 (lambda (v0)
                   (,e1 (lambda (v1)
                          (k (,pr v0 v1)))))))]

        [(,pr ,[e0])
         (if (eq? pr 'call/cc)
             `(lambda (k)
                (,e0
                 (lambda (proc)
                   (proc k (lambda (v) (v (lambda (a b c) (b k))))))))
             `(lambda (k)
                (,e0 (lambda (v0)
                       (k (,pr v0))))))]

        ;; XXX: workaround (void)
        [(,pr)
         (unless (eq? pr 'void)
           (error 'ruse "oops"))
         `(,pr)]

        ;; lambda application zero arguments
        [(,[e])
         `(lambda (k)
            (,e (lambda (v)
                  (lambda ()
                    (v k)))))]

        ;; lambda application one or more arguments
        [(,[e0] ,[e*] ... ,[e])
         `(lambda (k)
            (,e0 (lambda (v0)
                   ,(let f ((e* e*)
                            (v* '()))
                      (if (null? e*)
                          `(,e (lambda (v)
                                 (lambda ()
                                   (v0 k (lambda (k) (k ,v*)) ... (lambda (k) (k v))))))
                          (let ((tmp (make-tmp)))
                            `(,(car e*)
                              (lambda (,tmp) ,(f (cdr e*) (append v* (list tmp)))))))))))]

        ))

;; the definition of our compiler that pulls in all of our passes and runs
;; them in sequence checking to sexe if the programmer wants them traced.
(define-compiler my-tiny-compile
  (parse-and-rename unparse-Lsrc)
  (flatten-begin unparse-Lsrc)
  (remove-one-armed-if unparse-L1)
  (remove-and-or-not unparse-L2)
  (make-begin-explicit unparse-L3)
  (letrec-as-let-and-set unparse-L4)
  (begin-as-let unparse-L5)
  (let-as-lambda unparse-L6)
  (cps-trampoline unparse-L6)
  unparse-L6)

;; emit javascript

(define string-join
  (lambda (str* jstr)
    (cond
     [(null? str*) ""]
     [(null? (cdr str*)) (car str*)]
     [else (string-append (car str*) jstr (string-join (cdr str*) jstr))])))

;; symbol->c-id - converts any Scheme symbol into a valid C identifier.
(define symbol->c-id
  (lambda (sym)
    (let ([ls (string->list (symbol->string sym))])
      (if (null? ls)
          "_"
          (let ([fst (car ls)])
            (list->string
             (cons
              (if (char-alphabetic? fst) fst #\_)
              (map (lambda (c)
                     (if (or (char-alphabetic? c)
                             (char-numeric? c))
                         c
                         #\_))
                   (cdr ls)))))))))

(define (emit-args x)
  (string-join (map symbol->c-id x) ", "))

(define (emit x)
  (cond
   [(null? x) "RUSE_EMPTY_LIST"]
   [(number? x) (number->string x)]
   [(string? x) (string-append "\"" x "\"")]
   [(symbol? x) (symbol->c-id x)]

   ;; (void)
   [(and (pair? x) (eq? (car x) 'void))
    "voidf"]

   ;; (map func array)
   [(and (pair? x) (eq? (car x) 'map))
    (string-append (emit (list-ref x 2)) ".map(" (emit (list-ref x 1)) ")")]


   ;; (let a b)
   [(and (pair? x) (eq? (car x) 'let))
    (string-append "let " (symbol->c-id (cadr x)) " = " (emit (caddr x)))]

   ;; (eq? a b)
   [(and (pair? x) (eq? (car x) 'eq?))
    (string-append (emit (cadr x)) " === " (emit (caddr x)))]

   ;; (set! x e)
   [(and (pair? x) (eq? (car x) 'set!))
    (string-append (emit (cadr x)) " = " (emit (caddr x)))]

   ;; if
   [(and (pair? x) (eq? (car x) 'if))
    (string-join
     (append (list "/* if */ "
                   (emit (cadr x))
                   " ? "
                   (emit (caddr x))
                   " : "
                   (emit (cadddr x))
                   ""))
     "")]

   ;; function definition
   [(and (pair? x) (eq? (car x) 'lambda))
    (if (or (pair? (cadr x)) (null? (cadr x)))
        (string-join
         (append (list "(function("
                       (emit-args (cadr x))
                       ") { ")
                 (let loop ((body (cddr x))
                            (out '()))
                   (cond
                    ((and (pair? body) (pair? (cdr body)))
                     (loop (cdr body) (cons (string-append (emit (car body)) ";") out)))
                    ((pair? body)
                     (loop (cdr body) (cons (string-append "return " (emit (car body))) out)))
                    (else (reverse out))))

                 (list ";})"))
         " ")
        ;; (lambda args fu)
        (string-join
         (append (list "(function() { let ")
                 (list (symbol->c-id (cadr x)))
                 (list " = Array.prototype.slice.call(arguments);")
                 (let loop ((body (cddr x))
                            (out '()))
                   (cond
                    ((and (pair? body) (pair? (cdr body)))
                     (loop (cdr body) (cons (string-append (emit (car body)) ";") out)))
                    ((pair? body)
                     (loop (cdr body) (cons (string-append "return " (emit (car body))) out)))
                    (else (reverse out))))

                 (list ";})"))
         " "))
    ]

   ;; function call
   [(pair? x)
    (string-join (list (emit (car x))
                       "("
                       (string-join (map emit (cdr x)) ", ")
                       ")")
                 " ")]

   [else
    (display x)(newline)
    (error 'emit "got ~a" x)]))

;; main

(unless (= (length (command-line)) 3)
  (display "Usage: ruse.scm TARGET INPUT\n")
  (exit))

(define target (cadr (command-line)))

(define filepath (caddr (command-line)))

(define make-module-name (lambda () (unique-var 'm)))

(define (read-file filepath)
  (call-with-input-file filepath
    (lambda (port)
      (let loop ((current (read port))
                 (out '()))
        (if (eof-object? current)
            (reverse out)
            (loop (read port) (cons current out)))))))

(define (read-library filepath)
  (car (read-file filepath)))

(define (program-body+imports program)
  (let loop ((program program)
             (imports '()))
    (cond
     ((null? program)
      (error 'packer "program body is empty"))
     ((and (pair? (car program))
           (eq? (caar program) 'import))
      (loop (cdr program) (append (cdar program) imports)))
     (else (values program imports)))))

(define (explode definition)
  (let loop ((body (cddr definition))
             (exports '())
             (imports '()))
    (cond
     ((null? body) (values exports imports '()))
     ((and (pair? (car body)) (eq? (caar body) 'begin))
      (values exports imports (cdar body)))
     ((and (pair? (car body)) (eq? (caar body) 'export))
      (loop (cdr body) (append (cdar body) exports) imports))
     ((and (pair? (car body)) (eq? (caar body) 'import))
      (loop (cdr body) exports (append (cdar body) imports)))
     (else (error 'packer "error during library parsing" (cadr definition))))))

(define program (read-file filepath))

(define-values (program imports) (program-body+imports program))

(define libraries '())
(define program-dependencies '())

(define string-join
  (lambda (str* jstr)
    (cond
     [(null? str*) ""]
     [(null? (cdr str*)) (car str*)]
     [else (string-append (car str*) jstr (string-join (cdr str*) jstr))])))

(define (library-name->filepath name)
  (string-append (string-join (map symbol->string name) "/") ".scm"))

(define (ref alist v)
  (let loop ((alist alist))
    (if (null? alist)
        #f
        (if (equal? (caar alist) v)
            (cdar alist)
            (loop (cdr alist))))))

(define library-module-names '())
(define dependencies '())


;; read all required libraries
(let loop ((imports imports))
  (unless (null? imports)
    ;; deduplicate libraries
    (if (ref libraries (car imports))
        (loop (cdr imports))
        (let ((library (read-library (library-name->filepath (car imports)))))
          (set! libraries (cons (cons (car imports) library) libraries))
          (set! library-module-names (cons (cons (car imports) (make-module-name))
                                           library-module-names))
          (call-with-values (lambda () (explode library))
            (lambda (exports depends body)
              (let loop ((depends depends))
                (unless (null? depends)
                  (set! dependencies (cons (cons (car imports) (car depends))
                                           dependencies))
                  (loop (cdr depends))))
              (loop (append (cdr imports) depends))))))))

(define module-bodies '())

(define (process name module-name definition)
  (assert (equal? (cadr definition) name))
  (call-with-values (lambda () (explode definition))
    (lambda (exports imports body)
      (let* ((imports (map (lambda (x) (ref library-module-names x)) imports))
             (body `(module ,module-name
                            ,exports
                            ,@(if (null? imports) '() `((import ,@imports)))
                            ,@body)))
        (set! module-bodies (cons (cons name body) module-bodies))))))

;; topological sort of libraries according to dependencies based on
;; https://en.wikipedia.org/wiki/Topological_sorting#Algorithms
(define no-dependency '())

(let loop ((libraries libraries))
  (unless (null? libraries)
    (let ((library (car libraries)))
      (if (ref dependencies (car library))
          (loop (cdr libraries))
          (begin (set! no-dependency (cons (car library) no-dependency))
                 (loop (cdr libraries)))))))

(define order (let loop0 ((no-dependency no-dependency)
                          (out '()))
                (if (null? no-dependency)
                    (reverse out)
                    (let ((dependency (car no-dependency)))
                      (set! no-dependency (cdr no-dependency))
                      (let loop1 ((used-by (filter (lambda (x) (equal? (cdr x) dependency)) dependencies)))
                        (unless (null? used-by)
                          (set! dependencies (remove (car used-by) dependencies))
                          (unless (ref dependencies (caar used-by))
                            (set! no-dependency (cons (caar used-by) no-dependency)))
                          (loop1 (cdr used-by))))
                      (loop0 no-dependency (cons dependency out))))))

(let loop ((libraries libraries))
  (unless (null? libraries)
    (process (caar libraries)
             (ref library-module-names (caar libraries))
             (cdar libraries))
    (loop (cdr libraries))))

(define env (copy-environment (environment '(chezscheme))))

(define expanded
  (expand `(begin
             ,@(map (lambda (x) (ref module-bodies x)) order)
             ,@(map (lambda (x) `(import ,(ref library-module-names x))) imports)
             ,@program) env))

(define (extract bindings)
  (let loop ((bindings bindings)
             (out '()))
    (if (null? bindings)
        out
        (let ((binding (car bindings)))
          (cond
           ((and (pair? (cadr binding))
                 (eq? (caadr binding) 'set!))
            (loop (cdr bindings) (cons (cadadr binding) out)))
           ((and (pair? (cadr binding))
                 (pair? (cddr binding))
                 (eq? (caddr (caadr binding)) '$set-top-level-value!))
            (loop (cdr bindings) (cons (cadr (cadadr binding)) out)))
           (else (loop (cdr bindings) out)))))))

(define (toplevel-hoisting exp)
  (if (not (and (pair? exp) (eq? (car exp) 'begin)))
      exp
      (let loop ((body (cdr exp))
                 (out '())
                 (toplevel '()))
        (cond
         ((null? body)
          `(let ,(map (lambda (x) `(,x (void))) toplevel)
             ,@(reverse out)))
         ((not (pair? (car body)))
          (loop '() (append (reverse body) out) toplevel))
         ((eq? (caar body) 'letrec*)
          (loop (cdr body)
                (cons (car body) out)
                (append (extract (cadar body)) toplevel)))
         ((eq? (caar body) 'set!)
          (loop (cdr body)
                (cons (car body) out)
                (cons (cadar body) toplevel)))
         (else (loop '() (append (reverse body) out) toplevel))))))

(define (remove-top-level-value exp)
  (match exp
    (('begin exp ...)
     `(begin ,@(map remove-top-level-value exp)))
    ((('$primitive level '$set-top-level-value!) x e)
     `(set! ,(cadr x) ,(remove-top-level-value e)))
    ;; specific handling of foreign-procedure
    (((('$primitive level '$top-level-value) x0) x1)
     (let ((x0* (remove-top-level-value x0))
           (x1* (remove-top-level-value x1)))
       (cond
        ((eq? (string->symbol (symbol->string (cadr x0*)))
              'javascript-procedure)
         `(javascript-procedure ,(string->symbol (symbol->string x1*))))
        ((eq? (string->symbol (symbol->string (cadr x0*)))
              'javascript-callable)
         `(javascript-callable ,x1*))
        (else (list (cadr x0*) x1*)))))
    ((('$primitive level '$top-level-value) x)
     (cadr x))
    (('let ((x e) ...) body ...)
     (let* ((e* (map remove-top-level-value e))
            (body* (map remove-top-level-value body))
            (bindings (map list x e*)))
       `(let ,bindings ,@body*)))
    (('let* ((x e) ...) body ...)
     (let* ((e* (map remove-top-level-value e))
            (body* (map remove-top-level-value body))
            (bindings (map list x e*)))
       `(let* ,bindings ,@body*)))
    (('letrec ((x e) ...) body ...)
     (let* ((e* (map remove-top-level-value e))
            (body* (map remove-top-level-value body))
            (bindings (map list x e*)))
       `(letrec ,bindings ,@body*)))
    (('letrec* ((x e) ...) body ...)
     (let* ((e* (map remove-top-level-value e))
            (body* (map remove-top-level-value body))
            (bindings (map list x e*)))
       `(letrec* ,bindings ,@body*)))
    ((e ...)
     (map remove-top-level-value e))
    (else exp)))

;; (pk 'expanded expanded)

(define cool0 (remove-top-level-value expanded))

;; (pk 'cool0 cool0)

(define cool1 (toplevel-hoisting cool0))

;; (pk 'cool1 cool1)

(define compiled (my-tiny-compile cool1))

(cond
 ((string=? target "javascript")
  (display (emit compiled))
  (newline))
 ((string=? target "scheme")
  (pretty-print `(begin
                   (let loop ((thunk (,compiled display)))
                     (when (procedure? thunk)
                       (loop (thunk))))
                   (newline)))
  (newline))
 (else (display "wrong target choose javascript or scheme\n")))
