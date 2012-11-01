var vows   = require('vows'),
    assert = require('assert');
var monads = require('../identity-monad.js');

vows.describe('Identity Monad').addBatch({
  'wrap generates a monadic value closing over the value': {
    topic: function() { return monads.identityMonad.wrap('candy') },
    'when calling the monadic value we get the value back': function(topic) {
      assert.equal (topic(), 'candy');
    }
  },
  'bind binds a monadic value to a monad-producing function': {
    topic: function() { return monads.identityMonad.bind },
    'when calling the resulting monadic value we get the result of value + function' : function(topic) {
      var more = function(value) {
          return monads.identityMonad.wrap("more " + value);
      }
      var mv = monads.identityMonad.wrap('candy');
      var bound = topic(mv, more);
      assert.equal (bound(), 'more candy');
    }
  },
  'lift makes a non-monadic function into a monad-producing and consuming function': {
    topic: function() { return monads.identityMonad.lift },
    'when feeding it a monadic value, you get a monadic value from the result': function(topic) {
      var normalMore = function(value) {
        return "more " + value;
      }
      var mMore = topic(normalMore);
      var mv = monads.identityMonad.wrap('candy');
      assert.equal(mMore(mv)(), 'more candy');  
    }  
  },
  'first monadic law': {
    'left unit: wrap acts as neutral element of bind': function() {
      var more = function(value) {
          return monads.identityMonad.wrap("more " + value);
      }
      assert.equal(monads.identityMonad.bind(monads.identityMonad.wrap("candy"), more)(),
                   more("candy")());
    }
  },
  'second monadic law': {
    'right unit: wrap acts as neutral element of bind': function() {
      assert.equal(monads.identityMonad.bind(monads.identityMonad.wrap("candy"), monads.identityMonad.wrap)(),
                   monads.identityMonad.wrap("candy")());
    }
  },
  'third monadic law': {
    'associative: binding two functions in succession is equal to binding a combination of the two functions': function() {
      var f = function(value) {
          return monads.identityMonad.wrap("more " + value);
      }
      var g = function(value) {
          return monads.identityMonad.wrap("much " + value);
      }
      var mv = monads.identityMonad.wrap("candy");

      assert.equal(monads.identityMonad.bind(monads.identityMonad.bind(mv,f),g)(),
                   monads.identityMonad.bind(mv,function(x) { return monads.identityMonad.bind(f(x),g) })());
    }
  }
}).export(module);
