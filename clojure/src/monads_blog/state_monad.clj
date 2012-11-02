(ns monads-blog.state-monad)

(defn wrap[drink]
  (fn[sugars]
    {'drink drink 'sugars sugars}))

(defn bind[mv f]
  (fn[sugars]
    (let [realized  (mv sugars)
          drink     (realized 'drink)
          newSugars (realized 'sugars)]
      ((f drink) newSugars))))

