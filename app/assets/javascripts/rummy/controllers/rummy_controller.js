Rummy.RummyController = Ember.Controller.extend({
  playerCards: function() {
    return Rummy.game.player(1).cards();
  }.property('Rummy.game.player(1).cards().@each'),

  discardPileCards: function() {
    return Rummy.game.discardPile().cards();
  }.property(),

  playerMelds: function() {
    return Rummy.game.meldsForPlayer(1);
  }.property('Rummy.game._melds.[]'),

  discardButtonDisabled: function() {
    return !Rummy.game.canDiscardSelected();
  }.property('Rummy.game.selectedIndices.[]'),

  meldButtonDisabled: function() {
    return !Rummy.game.canMeldSelected();
  }.property('Rummy.game.selectedIndices.[]'),

  actions: {
    botTurn: function() {
      window.setTimeout(function() {
        Rummy.bot.takeTurn();
      }, 500);
    }
  }
});
