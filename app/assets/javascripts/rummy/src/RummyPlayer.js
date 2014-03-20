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
  this._melds = [];
}

RummyPlayer.prototype.cards = function() {
  return this._cards;
}

RummyPlayer.prototype.melds = function() {
  return this._melds;
}

RummyPlayer.prototype.takeCard = function(card) {
  this.cards().pushObject(card);
  this.sortCards()
}

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards().pushObjects(cards);
  this.sortCards();
}

RummyPlayer.prototype.sortCards = function() {
  this.cards().sort();
}

RummyPlayer.prototype.play = function(cardIndex) {
  var card = this.cards().objectAt(cardIndex);
  this.cards().removeAt(cardIndex, 1);
  return card;
}

RummyPlayer.prototype.meldIndices = function(indices) {
  var meldedCards = this.cards().get('content').reduce(function(selectedCards, card, index) {
    if (indices.indexOf(index) > -1) selectedCards.push(card);
    return selectedCards;
  }, []);

  for (i = this.cards().get('content').length; i >= 0; i--) {
    if (indices.indexOf(i) > -1) this.cards().get('content').splice(i, 1);
  }

  var meld = new RummyMeld;
  meld.meld(meldedCards);

  this.melds().push(meld);
}
