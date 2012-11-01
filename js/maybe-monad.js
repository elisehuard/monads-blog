var maybeMonad = new function() {
  var wrap = function(value) {
    return function() { return value }
  };

  var bind = function(mv, f) {
    return function() {
      if (mv()) {
        return f(mv())();
      } else {
        return mv();
      }
    }
  };
  return {
    wrap: wrap,
    bind: bind
  }
}();

exports.maybeMonad = maybeMonad;
