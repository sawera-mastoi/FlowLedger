;; Simple Counter Contract
;; A basic contract to demonstrate state management in Clarity

(define-data-var counter uint u0)

;; Public functions

;; Increment the counter
;; @desc Increment public counter state
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))
  )
)

;; Decrement the counter
;; @desc Decrement public counter state
(define-public (decrement)
  (begin
    (if (> (var-get counter) u0)
      (begin
        (var-set counter (- (var-get counter) u1))
        (ok (var-get counter))
      )
      (err u403) ;; Error if counter is already 0
    )
  )
)

;; Read-only functions

;; Get the current value of the counter
(define-read-only (get-counter)
  (ok (var-get counter))
)
