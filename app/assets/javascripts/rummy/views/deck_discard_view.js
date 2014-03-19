Rummy.DeckDiscardView = Ember.View.extend({
  tagName: 'section',
  elementId: 'deck-discard',

  actions: {
    draw: function() {
      Rummy.game.draw();
    }
  }
});