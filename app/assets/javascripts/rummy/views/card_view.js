Rummy.CardView = Ember.View.extend({
  tagName: 'div',
  classNameBindings: ['imageClass', 'selected'],

  imageClass: function() {
    card = this._context;
    return ("card-" + card.suit() + card.rank()).toLowerCase();
  }.property(),

  index: function() {
    card = this._context;
    return Rummy.game.player(1).cards().indexOf(card);
  }.property(),

  selected: function() {
    return Rummy.game.selectedIndices.contains(this.get('index'));
  }.property('Rummy.game.selectedIndices.@each'),

  click: function() {
    cardElement = this.$();
    if (cardElement.hasClass('selected')) {
      Rummy.game.deselectCard(this.get('index'));
      cardElement.addClass('selected');
    } else {
      Rummy.game.selectCard(this.get('index'));
      cardElement.removeClass('selected');
    }
  }
});

Ember.Handlebars.helper('card', Rummy.CardView);