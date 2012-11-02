(ns monads-blog.test.identity-monad
  (:use [monads-blog.identity-monad])
  (:use [monads-blog.test.monadic-laws])
  (:use [clojure.test]))

; dummy example functions to use for tests
(defn more[value]
    (wrap (str "more " value)))

(defn much[value]
    (wrap (str "more " value)))

(defn normal-more[value]
  (str "more " value))

; the actual tests
(deftest wrap-test
  (testing "wrap generates a monadic value closing over the value"
    (is (= ((wrap "candy")) "candy"))))

(deftest bind-test
  (testing "bind binds a monadic value to a monad-producing function"
    (is (= ((bind (wrap "candy") more)) "more candy"))))

(deftest lift-test
  (testing "lift makes a non-monadic function into a monad-producing and consuming function"
     (is (= (((lift normal-more) (wrap "candy"))) "more candy"))))

(deftest monadic-laws
  (testing "the identity monad follows the monadic laws"
     (is (first-monadic-law wrap bind more "candy"))
     (is (second-monadic-law wrap bind "candy"))
     (is (third-monadic-law wrap bind much more "candy"))))

