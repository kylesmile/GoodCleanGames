Rummy.PlayerView = Ember.View.extend({
  click: function(event) {
    card = $(event.target);
    index = card.data('index')
    if (index) {
      if (card.hasClass('selected')) {
        Rummy.game.deselectCard(index);
        card.addClass('selected');
      } else {
        Rummy.game.selectCard(index);
        card.removeClass('selected');
      }
    }
  },

  tagName: 'section',
  elementId: 'player'
});