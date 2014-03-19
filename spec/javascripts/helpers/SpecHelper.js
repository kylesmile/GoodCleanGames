//= require ember
//= require_tree ../../../app/assets/javascripts/rummy

beforeEach(function() {
    jasmine.addMatchers({
      toBeAKindOf: function() {
        return {
          compare: function(object, type) {
            return {
              pass: object.__proto__ === type.prototype
            };
          }
        };
      }
    });
});