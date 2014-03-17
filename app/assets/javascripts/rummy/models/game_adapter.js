Rummy.GameAdapter = Ember.Object.extend({
  game: new RummyGame(2),

  draw: function() {
    this.game.draw();
  },

  playerCards: function() {
    return this.game.player(1).cards();
  }.property()
});

Rummy.gameAdapter = Rummy.GameAdapter.create();