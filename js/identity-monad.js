var identityMonad = new function() {
  var wrap = function(value) {
    return function() { return value }
  };

  var bind = function(mv, f) {
    return function() {
      return f(mv())();
    }
  };

  var lift = function(f) {
    return function(mv) {
      return bind(mv, function() {
        return wrap(f(mv()));
      })
    }
  }
  return {
    wrap: wrap,
    bind: bind,
    lift: lift
  }
}();

exports.identityMonad = identityMonad;
