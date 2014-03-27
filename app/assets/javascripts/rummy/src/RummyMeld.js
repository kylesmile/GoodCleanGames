function RummyMeld(playerNumber) {
  this._cards = [];
  this._playerNumber = playerNumber;
};

RummyMeld.SET = 'SET';
RummyMeld.RUN = 'RUN';

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

RummyMeld.prototype.isSet = function() {
  if (this._type == RummyMeld.SET) return true;
  if (this.size() < 2) return false;
  return this.cards()[0].rank() == this.cards()[1].rank();
};

RummyMeld.prototype.isRun = function() {
  if (this._type == RummyMeld.RUN) return true;
  if (this.size() < 2) return false;
  return !this.isSet();
};

RummyMeld.prototype.setType = function(type) {
  if (this.size() < 2) this._type = type;
};

RummyMeld.prototype.first = function() {
  if (this.isRun()) return this.cards()[0];
};

RummyMeld.prototype.last = function() {
  if (this.isRun()) return this.cards()[this.cards().length - 1];
};

RummyMeld.prototype.rank = function() {
  if (this.isSet()) return this.cards()[0].rank();
};

RummyMeld.prototype.suit = function() {
  if (this.isRun()) return this.cards()[0].suit();
};
