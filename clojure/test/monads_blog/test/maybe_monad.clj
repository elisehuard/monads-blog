(ns monads-blog.test.maybe-monad
  (:use [monads-blog.maybe-monad])
  (:use [monads-blog.test.monadic-laws])
  (:use [clojure.test]))

; dummy example functions to use for tests
(defn more[value]
    (wrap (str "more " value)))

(defn much[value]
    (wrap (str "more " value)))

; actual tests
(deftest bind-test
  (testing "when calling the resulting monadic value we get nil if the original value was nil"
    (is (= ((bind (wrap nil) more)) nil))))

(deftest monadic-laws
  (testing "the maybe monad follows the monadic laws"
     (is (first-monadic-law wrap bind more "candy"))
     ; interesting case: should functions test for nil as well?
     ; (is (first-monadic-law wrap bind more nil))
     (is (second-monadic-law wrap bind "candy"))
     (is (second-monadic-law wrap bind nil))
     (is (third-monadic-law wrap bind much more "candy"))))
