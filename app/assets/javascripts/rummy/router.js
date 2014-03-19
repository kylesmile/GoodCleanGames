Rummy.Router.map(function() {
  this.resource('rummy', { path: '/' });
});

Rummy.RummyRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('games');
  }
});