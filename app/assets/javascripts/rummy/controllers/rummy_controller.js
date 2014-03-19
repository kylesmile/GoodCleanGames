Rummy.RummyController = Ember.Controller.extend({
  actions: {
    draw: function() {
      Rummy.gameAdapter.draw();
    }
  },

  playerCards: function() {
    return Rummy.gameAdapter.get('playerCards');
  }.property('Rummy.gameAdapter.playerCards')
});