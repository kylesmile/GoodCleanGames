Rummy.TurnView = Ember.View.extend({
  tagName: 'section',
  elementId: 'turn',

  actions: {
    discard: function() {
      Rummy.game.discard();
    }
  }
});