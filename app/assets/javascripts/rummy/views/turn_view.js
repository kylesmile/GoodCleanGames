Rummy.TurnView = Ember.View.extend({
  actions: {
    discard: function() {
      Rummy.game.discardSelected();
    }
  }
});