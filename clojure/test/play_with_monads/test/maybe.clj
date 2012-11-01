(ns play-with-monads.test.maybe)

;; making do:
;; cannot compare functions, cannot compare functions for all values but can compare functions for some values.
(deftest left-identity
  (is (= (
