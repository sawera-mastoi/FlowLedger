;; SIP-010 Simple Fungible Token
;; A boilerplate for creating your own token on Stacks

(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token simple-token)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

;; Public functions

;; Transfer tokens to another principal
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (ft-transfer? simple-token amount sender recipient)
  )
)

;; Mint new tokens (owner only)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? simple-token amount recipient)
  )
)

;; Read-only functions

;; Get the token name
(define-read-only (get-name)
  (ok "Simple Token")
)

;; Get the token symbol
(define-read-only (get-symbol)
  (ok "STKN")
)

;; Get the number of decimals
(define-read-only (get-decimals)
  (ok u6)
)

;; Get the total supply
(define-read-only (get-total-supply)
  (ok (ft-get-supply simple-token))
)

;; Get the balance of a principal
(define-read-only (get-balance (who principal))
  (ok (ft-get-balance simple-token who))
)

;; Get the token URI
(define-read-only (get-token-uri)
  (ok (some u"https://stacks.co/simple-token.json"))
)
