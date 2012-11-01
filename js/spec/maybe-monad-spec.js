var vows   = require('vows'),
    assert = require('assert');
var monads = require('../maybe-monad.js'),
    wrap   = monads.maybeMonad.wrap,
    bind   = monads.maybeMonad.bind;


vows.describe('Maybe Monad').addBatch({
  'wrap generates a monadic value closing over the value or null if value = null': {
    'when calling the monadic value we get the value back': function() {
      assert.equal (wrap("candy")(), 'candy');
    },
    'when calling the monadic value with null value we get null': function(topic) {
      assert.deepEqual (wrap(undefined)(), undefined);
      assert.deepEqual (wrap(null)(), null);
    }
  },
  'bind binds a monadic value to a monad-producing function': {
    'when calling the resulting monadic value we get undefined if the original value was undefined' : function() {
      var more = function(value) {
          return wrap("more " + value);
      }
      var mv = wrap(undefined);
      var bound = bind(mv, more);
      assert.equal (bound(), undefined);
    },
    'when calling the resulting monadic value we get null if the original value was null' : function() {
      var more = function(value) {
          return wrap("more " + value);
      }
      var mv = wrap(null);
      var bound = bind(mv, more);
      assert.equal (bound(), null);
    }
  }
}).export(module);
