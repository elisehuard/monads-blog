var assert = require('assert');

var laws = function() {
  var firstMonadicLaw = function(bind, wrap, f, value) {
    assert.equal(bind(wrap(value), f)(),
                 f(value)());
  };
  
  var secondMonadicLaw = function(bind, wrap, value) {
    assert.equal(bind(wrap(value), wrap)(),
                 wrap(value)());
  };

  var thirdMonadicLaw = function(bind, wrap, f, g, value) {
    var mv = wrap("candy");

    assert.equal(bind(bind(mv,f),g)(),
                 bind(mv,function(x) { return bind(f(x),g) })());
  }

  return {
    first: firstMonadicLaw,
    second: secondMonadicLaw,
    third: thirdMonadicLaw
  }
}();

exports.laws = laws;
