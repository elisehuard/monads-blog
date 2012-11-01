var vows   = require('vows'),
    assert = require('assert');
var monads = require('../identity-monad.js'),
    wrap   = monads.identityMonad.wrap,
    bind   = monads.identityMonad.bind,
    lift   = monads.identityMonad.lift;

vows.describe('Identity Monad').addBatch({
  'wrap generates a monadic value closing over the value': {
    topic: function() { return wrap('candy') },
    'when calling the monadic value we get the value back': function(topic) {
      assert.equal (topic(), 'candy');
    }
  },
  'bind binds a monadic value to a monad-producing function': {
    topic: function() { return bind },
    'when calling the resulting monadic value we get the result of value + function' : function(topic) {
      var more = function(value) {
          return wrap("more " + value);
      }
      var mv = wrap('candy');
      var bound = topic(mv, more);
      assert.equal (bound(), 'more candy');
    }
  },
  'lift makes a non-monadic function into a monad-producing and consuming function': {
    topic: function() { return lift },
    'when feeding it a monadic value, you get a monadic value from the result': function(topic) {
      var normalMore = function(value) {
        return "more " + value;
      }
      var mMore = topic(normalMore);
      var mv = wrap('candy');
      assert.equal(mMore(mv)(), 'more candy');  
    }  
  },
  'first monadic law': {
    'left unit: wrap acts as neutral element of bind': function() {
      var more = function(value) {
          return wrap("more " + value);
      }
      assert.equal(bind(wrap("candy"), more)(),
                   more("candy")());
    }
  },
  'second monadic law': {
    'right unit: wrap acts as neutral element of bind': function() {
      assert.equal(bind(wrap("candy"), wrap)(),
                   wrap("candy")());
    }
  },
  'third monadic law': {
    'associative: binding two functions in succession is equal to binding a combination of the two functions': function() {
      var f = function(value) {
          return wrap("much " + value);
      }
      var g = function(value) {
          return wrap("more " + value);
      }
      var mv = wrap("candy");

      assert.equal(bind(bind(mv,f),g)(),
                   bind(mv,function(x) { return bind(f(x),g) })());
    }
  }
}).export(module);
