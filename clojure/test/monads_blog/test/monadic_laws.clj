(ns monads-blog.test.monadic-laws
  (:use [clojure.test]))

(defn first-monadic-law [wrap bind f value]
  (= ((bind (wrap value) f)) ((f value))))

(defn second-monadic-law [wrap bind value]
  (= ((bind (wrap value) wrap)) ((wrap value))))

(defn third-monadic-law [wrap bind f g value]
  (let [mv (wrap value)]
    (= ((bind (bind mv f) g)) ((bind mv (fn[x] (bind (f x) g)))))))
