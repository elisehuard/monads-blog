var stateMonad = new function() {
  var wrap = function(drink) {
    return function(sugars) {
      return {drink: drink,
              sugars: sugars};
    }
  };

  var bind = function(mv, f) {
    return function(sugars) {
      var value     = mv(sugars);
      var drink     = value.drink,
          newSugars = value.sugars;
      return f(drink)(newSugars);
    }
  };
  return {
    wrap: wrap,
    bind: bind
  }
}();

exports.stateMonad = stateMonad;
