(ns monads-blog.test.state-monad
  (:use [monads-blog.state-monad])
  (:use [clojure.test]))

; dummy example functions to use for tests
(defn more[value]
    (wrap (str "more " value)))

(defn addSugar[value]
    (fn[sugars]
      {'drink value 'sugars (inc sugars)}))

(defn mMore[mv]
  (bind mv more))

(defn mAddSugar[mv]
  (bind mv addSugar))

; the actual tests
(deftest wrap-test
  (testing "wrap generates a monadic value closing over the value"
    (is (= ((wrap "coffee") 2) {'drink "coffee" 'sugars 2}))))

(deftest bind-test-change-value
  (testing "bind binds a monadic value to a monad-producing function"
    (is (= ((bind (wrap "coffee") more) 2) {'drink "more coffee" 'sugars 2}))))

(deftest bind-test-change-state
  (testing "bind binds a monadic value to a monad-producing function"
    (is (= ((bind (wrap "coffee") addSugar) 2) {'drink "coffee" 'sugars 3}))))

(deftest daisy-chain
  (testing "you can add functions in order to make stuff happen"
    (is (= ((mMore (mAddSugar (mMore (mAddSugar (wrap "coffee"))))) 0) {'drink "more more coffee" 'sugars 2}))))

