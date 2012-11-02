(ns monads-blog.maybe-monad)

(defn wrap[value] (fn[] value))

(defn bind[mv f]
  (let [value (mv)]
    (if (nil? value)
      (wrap nil)
      (f (mv)))))

