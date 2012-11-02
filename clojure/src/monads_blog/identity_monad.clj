(ns monads-blog.identity-monad)

(defn wrap[value] (fn[] value))

(defn bind[mv f] (f (mv)))

(defn lift[f]
  (fn[mv]
    (fn[] (bind mv f))
   ))
