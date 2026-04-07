;; Simple Profile/Message Contract
;; A way to store and retrieve a message for each user

(define-map profiles
  { user: principal }
  { message: (string-ascii 100), last-updated: uint }
)

;; Public functions

;; Set or update your message
(define-public (set-message (message (string-ascii 100)))
  (begin
    (map-set profiles
      { user: tx-sender }
      { message: message, last-updated: burn-block-height }
    )
    (ok true)
  )
)

;; Read-only functions

;; Get the message for a user
(define-read-only (get-profile (user principal))
  (ok (map-get? profiles { user: user }))
)

;; Get the last burner block height
(define-read-only (get-height)
  (ok burn-block-height)
)
