function RummyPlayer() {
  this._cards = Ember.ArrayController.create({
    content: [],
    sort: function() {
      this.propertyWillChange('content');
      this.get('content').sort(function(card1, card2) {
        if (card1.order() < card2.order()) return -1;
        if (card1.order() > card2.order()) return 1;
        return 0;
      });
      this.propertyDidChange('content');
    }
  });
};

RummyPlayer.prototype.cards = function() {
  return this._cards;
};

RummyPlayer.prototype.takeCard = function(card) {
  this.cards().pushObject(card);
  this.sortCards()
};

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards().pushObjects(cards);
  this.sortCards();
};

RummyPlayer.prototype.sortCards = function() {
  this.cards().sort();
};

RummyPlayer.prototype.playIndices = function(cardIndices) {
  var cards = this.cards().objectsAt(cardIndices);
  this.cards().removeObjects(cards);
  return cards;
};
