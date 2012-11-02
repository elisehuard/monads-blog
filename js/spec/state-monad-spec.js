var vows   = require('vows'),
    assert = require('assert');
var monads = require('../state-monad.js');

var wrap   = monads.stateMonad.wrap,
    bind   = monads.stateMonad.bind,
    lift   = monads.stateMonad.lift;

vows.describe('State Monad').addBatch({
  'wrap generates a monadic value taking state closing over the value': {
    'when calling the monadic value we get the value and state': function() {
      var value = wrap('coffee')(2); // state fed in as argument
      assert.equal (value.drink, 'coffee');
      assert.equal (value.sugars, 2);
    }
  },
  'bind binds a monadic value to a monad-producing function': {
    'when calling the resulting monadic value we get the result of value + function' : function() {
      var more = function(value) {
          return wrap("more " + value);
      }
      var mv = wrap('coffee');
      var bound = bind(mv, more);
      var realized = bound(3);
      assert.equal (realized.drink, 'more coffee');
      assert.equal (realized.sugars, 3);
    },
    'can also bind to a function that adds on the state' : function() {
      var addSugar = function(drink) {
        return function(sugars) {
          return { drink: drink, sugars: sugars + 1 }
        }
      }
      var mv = wrap('coffee');
      var bound = bind(mv, addSugar);
      var realized = bound(3);
      assert.equal (realized.drink, 'coffee');
      assert.equal (realized.sugars, 4);
    }
  },
  'chaining functions for fun and profit': function() {
    var more = function(value) {
        return wrap("more " + value);
    }
    var addSugar = function(drink) {
      return function(sugars) {
        return { drink: drink, sugars: sugars + 1 }
      }
    }
    var mMore = function(mv) {
      return bind(mv, more);
    }
    var mAddSugar = function(mv) {
      return bind(mv, addSugar);
    }

    var realized = mMore(mAddSugar(mMore(mAddSugar(wrap("coffee")))))(0);
    assert.equal (realized.drink, 'more more coffee');
    assert.equal (realized.sugars, 2);
  }
}).export(module);
