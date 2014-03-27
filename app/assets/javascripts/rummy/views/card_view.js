Rummy.CardView = Ember.View.extend({
  tagName: 'div',
  classNameBindings: ['imageClass', 'selected'],

  imageClass: function() {
    var card = this._context;
    return ("card-" + card.suit() + card.rank()).toLowerCase();
  }.property(),

  index: function() {
    var card = this._context;
    return Rummy.game.player(1).cards().indexOf(card);
  },

  selected: function() {
    return Rummy.game.selectedIndices.contains(this.index());
  }.property('Rummy.game.selectedIndices.@each'),

  click: function() {
    if (this.get('selectable')) {
      var cardElement = this.$();
      if (cardElement.hasClass('selected')) {
        Rummy.game.deselectCard(this.index());
        cardElement.addClass('selected');
      } else {
        Rummy.game.selectCard(this.index());
        cardElement.removeClass('selected');
      }
    }
  }
});

Ember.Handlebars.helper('card', Rummy.CardView);
