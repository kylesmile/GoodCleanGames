function RummyDiscardPile() {
  this._cards = [];
}

RummyDiscardPile.prototype.discard = function(card) {
  this._cards.pushObject(card);
}

RummyDiscardPile.prototype.size = function() {
  return this._cards.length;
}

RummyDiscardPile.prototype.cards = function() {
  return this._cards;
}