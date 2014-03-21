Rummy.TurnView = Ember.View.extend({
  tagName: 'section',
  elementId: 'turn',

  actions: {
    discard: function() {
      Rummy.game.discard();
      this.get('controller').send('botTurn');
    },

    meld: function() {
      Rummy.game.meldSelected();
    }
  }
});