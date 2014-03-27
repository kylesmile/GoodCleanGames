function RummyMeld(playerNumber) {
  this._cards = [];
  this._playerNumber = playerNumber;
};

RummyMeld.prototype.cards = function() {
  return this._cards;
};

RummyMeld.prototype.playerNumber = function() {
  return this._playerNumber;
};

RummyMeld.prototype.size = function() {
  return this._cards.length;
};

RummyMeld.prototype.meld = function(cards) {
  this.cards().push.apply(this.cards(), cards);
  this.sortCards();
};

RummyMeld.prototype.sortCards = function() {
  this.cards().sort(function(card1, card2) {
    if (card1.order() < card2.order()) return -1;
    if (card1.order() > card2.order()) return 1;
    return 0;
  });
};
