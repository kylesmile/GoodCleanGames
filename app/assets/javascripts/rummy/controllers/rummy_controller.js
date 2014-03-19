Rummy.RummyController = Ember.Controller.extend({
  playerCards: function() {
    return Rummy.game.player(1).cards();
  }.property()
});