function RummyGame(playerCount) {
  this._playerCount = playerCount || 4;

  this._deck = new CardDeck;
  this._deck.shuffle();
  this._players = [];
  this._melds = [];
  this._discardPile = new RummyDiscardPile;
  this._hasDrawn = false;
  this._turn = 1;
  this.selectedIndices = [];

  for (var i = 0; i < this._playerCount; i++) {
    this._players.push(new RummyPlayer);
  }

  for (var i = 0; i < 7; i++) {
    this._players.forEach(function(player) {
      player.takeCard(this._deck.draw());
    }, this);
  }

  this._discardPile.discard(this._deck.draw());
};

RummyGame.prototype.playerCount = function() {
  return this._playerCount;
};

RummyGame.prototype.deck = function() {
  return this._deck;
};

RummyGame.prototype.discardPile = function() {
  return this._discardPile;
};

RummyGame.prototype.player = function(number) {
  return this._players[number - 1];
};

RummyGame.prototype.melds = function() {
  return this._melds;
};

RummyGame.prototype.meldsForPlayer = function(playerNumber) {
  return this.melds().filter(function(meld) {
    return meld.playerNumber() == playerNumber;
  });
};

RummyGame.prototype.meldsForCurrentPlayer = function() {
  return this.meldsForPlayer(this.turn());
};

RummyGame.prototype.turn = function() {
  return this._turn;
};

RummyGame.prototype.currentPlayer = function() {
  return this.player(this.turn());
};

RummyGame.prototype.draw = function() {
  if (!this._hasDrawn) {
    this.player(this.turn()).takeCard(this.deck().draw());
    this._hasDrawn = true;
  }
};

RummyGame.prototype.canDiscardSelected = function() {
  return this.selectedIndices.length == 1 && this._hasDrawn;
};

RummyGame.prototype.selectedCards = function() {
  var selectedCards = this.selectedIndices.map(function(index) {
    return this.currentPlayer().cards().get('content')[index];
  }, this);

  selectedCards.sort(function(card1, card2) {
    if (card1.order() < card2.order()) return -1;
    if (card1.order() > card2.order()) return 1;
    return 0;
  });

  return selectedCards;
};

RummyGame.prototype.canMeldSelected = function() {
  if (!this._hasDrawn || this.selectedIndices.length < 3) return false;

  var selectedCards = this.selectedCards();

  var isSet = selectedCards.every(function(card, index, cards) {
    if (index == 0) return true;
    return card.rank() == cards[index - 1].rank();
  });
  if (isSet) return true;

  var isRun = selectedCards.every(function(card, index, cards) {
    if (index == 0) return true;
    return card.order() == cards[index - 1].order() + 1 && card.suit() == cards[index - 1].suit();
  });
  if (isRun) return true;

  return false;
};

RummyGame.prototype.canAddSelectedToSet = function() {
  if (!this._hasDrawn || this.selectedIndices.length != 1) return false;

  var selectedCards = this.selectedCards();
  if (this.meldsForCurrentPlayer()[0].rank() == selectedCards[0].rank()) return true;
  if (this.melds().some(function(meld) {
    return meld.rank() == selectedCards[0].rank();
  })) return true;

  return false;
};

RummyGame.prototype.selectCard = function(cardIndex) {
  if (!this.selectedIndices.some(function(index) { return index == cardIndex })) {
    this.selectedIndices.pushObject(cardIndex);
  }
};

RummyGame.prototype.deselectCard = function(cardIndex) {
  this.selectedIndices.removeObject(cardIndex);
};

RummyGame.prototype.discard = function() {
  if (this.canDiscardSelected()) {
    var playedCard = this.currentPlayer().playIndices(this.selectedIndices)[0];
    this.discardPile().discard(playedCard);
    this._turn = this.turn() + 1;
    if (this.turn() > this.playerCount()) this._turn = 1;
    this._hasDrawn = false;
    this.selectedIndices.clear();
  }
};

RummyGame.prototype.meldSelected = function() {
  if (this.canMeldSelected()) {
    var cards = this.currentPlayer().playIndices(this.selectedIndices);
    var meld = new RummyMeld(this.turn());
    meld.meld(cards);
    this.melds().pushObject(meld);
    this.selectedIndices.clear();
  }
};

RummyGame.prototype.addSelectedToSet = function() {
  if (this.canAddSelectedToSet()) {
    var card = this.currentPlayer().playIndices(this.selectedIndices)[0];

    var targetMeld = this.meldsForCurrentPlayer().filter(function(meld) {
      return meld.rank() == card.rank();
    })[0];

    if (!targetMeld) {
      targetMeld = new RummyMeld(this.turn());
      this.melds().pushObject(targetMeld);
    }
    targetMeld.meld([card]);
    targetMeld.setType(RummyMeld.SET);
    this.selectedIndices.clear();
  }
};
