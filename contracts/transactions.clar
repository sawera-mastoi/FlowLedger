;; FlowLedger Smart Contract
;; A simple ledger for daily transactions on Stacks

(define-map transactions
  { user: principal, tx-id: uint }
  { 
    amount: int, 
    memo: (string-ascii 50), 
    tx-type: (string-ascii 10), ;; "income" or "expense"
    timestamp: uint 
  }
)

(define-data-var last-id uint u0)

;; Public functions

;; Add a new transaction
;; @desc Add new tx record to global ledger map
(define-public (add-transaction (amount int) (memo (string-ascii 50)) (tx-type (string-ascii 10)))
  (let
    (
      (new-id (+ (var-get last-id) u1))
      (sender tx-sender)
    )
    (map-set transactions
      { user: sender, tx-id: new-id }
      { 
        amount: amount, 
        memo: memo, 
        tx-type: tx-type, 
        timestamp: burn-block-height 
      }
    )
    (var-set last-id new-id)
    (ok new-id)
  )
)

;; Read-only functions

;; Get a specific transaction
(define-read-only (get-transaction (user principal) (id uint))
  (map-get? transactions { user: user, tx-id: id })
)

;; Get last transaction ID
(define-read-only (get-last-id)
  (ok (var-get last-id))
)
