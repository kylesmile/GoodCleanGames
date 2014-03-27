describe("RummyGame", function() {
  var game;

  beforeEach(function() {
    game = new RummyGame;
  });

  it("has a deck", function() {
    expect(game.deck()).toBeAKindOf(CardDeck);
    expect(game.deck().size()).toBe(23)
  });

  it("has players", function() {
    var game1 = new RummyGame(2);
    var game2 = new RummyGame(3);

    expect(game1._players.length).toBe(2);
    expect(game2._players.length).toBe(3);
    expect(game._players.length).toBe(4);
    for (var i = 1; i <= 4; i++) {
      expect(game.player(i)).toBeAKindOf(RummyPlayer);
      expect(game.player(i).cards().get('content').length).toBe(7);
    }
  });

  it("has a discard pile", function() {
    expect(game.discardPile()).toBeAKindOf(RummyDiscardPile);
    expect(game.discardPile().size()).toBe(1);
  });

  it("keeps track of players' melds", function() {
    var meld1 = new RummyMeld(1);
    var meld2 = new RummyMeld(1);
    var meld3 = new RummyMeld(2);
    game.melds().pushObjects([meld1, meld2, meld3]);

    expect(game.melds()).toEqual([meld1, meld2, meld3]);
    expect(game.meldsForPlayer(1)).toEqual([meld1, meld2]);
    expect(game.meldsForPlayer(2)).toEqual([meld3]);
  });

  it("allows drawing cards", function() {
    game.draw();
    expect(game.player(1).cards().get('content').length).toBe(8);
    game.draw();
    expect(game.player(1).cards().get('content').length).toBe(8);
  });

  it("allows discarding cards", function() {
    expect(game.turn()).toBe(1);

    expect(game.canDiscardSelected()).toBe(false);

    game.selectCard(0);
    expect(game.canDiscardSelected()).toBe(false);

    game.discard();
    expect(game.discardPile().size()).toBe(1);
    expect(game.player(1).cards().get('content').length).toBe(7);
    expect(game.turn()).toBe(1);

    game.draw();
    expect(game.canDiscardSelected()).toBe(true);

    game.selectCard(1);
    expect(game.canDiscardSelected()).toBe(false);

    game.deselectCard(1);
    expect(game.canDiscardSelected()).toBe(true);

    expect(game.player(1).cards().get('content').length).toBe(8);
    game.discard();
    expect(game.discardPile().size()).toBe(2);
    expect(game.player(1).cards().get('content').length).toBe(7);
    expect(game.turn()).toBe(2);
    expect(game.selectedIndices.length).toBe(0);
  });

  it("properly handles turn order", function() {
    expect(game.turn()).toBe(1);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();

    expect(game.turn()).toBe(2);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();

    expect(game.turn()).toBe(3);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();

    expect(game.turn()).toBe(4);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();

    expect(game.turn()).toBe(1);
    expect(game._hasDrawn).toBe(false);
  });

  describe("making melds", function() {
    var aceOfSpades, aceOfDiamonds, aceOfHearts, twoOfDiamonds, twoOfSpades, threeOfSpades;

    beforeEach(function() {
      aceOfSpades = new RummyCard("A", "S");
      aceOfDiamonds = new RummyCard("A", "D");
      aceOfHearts = new RummyCard("A", "H");
      twoOfDiamonds = new RummyCard("2", "D");
      twoOfSpades = new RummyCard("2", "S");
      threeOfSpades = new RummyCard("3", "S");

      game.player(1).cards().set('content', [aceOfSpades, aceOfDiamonds, aceOfHearts, twoOfDiamonds, twoOfSpades, threeOfSpades]);
    });

    it("knows if a new meld is valid", function() {
      game.deck()._cards.push(new RummyCard('K', 'D'));
      game.draw();
      expect(game.canMeldSelected()).toBe(false);

      game.selectCard(0);
      game.selectCard(1);
      game.selectCard(2);
      expect(game.canMeldSelected()).toBe(true);

      game.selectCard(3);
      expect(game.canMeldSelected()).toBe(false);

      game.deselectCard(0);
      game.deselectCard(1);
      game.deselectCard(2);
      game.deselectCard(3);

      game.selectCard(0);
      game.selectCard(4);
      game.selectCard(5);
      expect(game.canMeldSelected()).toBe(true);

      game.selectCard(1);
      expect(game.canMeldSelected()).toBe(false);

      game.deselectCard(1);
      game.deselectCard(4);

      game.selectCard(3);
      expect(game.canMeldSelected()).toBe(false);
    });

    it("can make new melds", function() {
      var fourOfSpades = new RummyCard("4", "S");
      game.deck()._cards.push(fourOfSpades);
      game.draw();

      expect(game.meldsForPlayer(1).length).toBe(0);

      game.meldSelected();
      expect(game.meldsForPlayer(1).length).toBe(0);

      game.selectCard(0);
      game.selectCard(1);
      game.selectCard(2);

      game.meldSelected();

      expect(game.meldsForPlayer(1).length).toBe(1);
    });

    describe("adding to melds", function() {
      var aceOfClubs;
      var threeOfDiamonds, fourOfDiamonds, fiveOfDiamonds;
      var sevenOfSpades, sevenOfHearts, sevenOfClubs, sevenOfDiamonds;
      var tenOfClubs, jackOfClubs, queenOfClubs, kingOfClubs;

      beforeEach(function() {
        aceOfClubs = new RummyCard('A', 'C');
        threeOfDiamonds = new RummyCard('3', 'D');
        fourOfDiamonds = new RummyCard('4', 'D');
        fiveOfDiamonds = new RummyCard('5', 'D');
        sevenOfSpades = new RummyCard('7', 'S');
        sevenOfHearts = new RummyCard('7', 'H');
        sevenOfClubs = new RummyCard('7', 'C');
        sevenOfDiamonds = new RummyCard('7', 'D');
        tenOfClubs = new RummyCard('10', 'C');
        jackOfClubs = new RummyCard('J', 'C');
        queenOfClubs = new RummyCard('Q', 'C');
        kingOfClubs = new RummyCard('K', 'C');

        game.player(1).cards().set('content', [aceOfClubs, twoOfDiamonds, twoOfSpades, threeOfSpades, sevenOfDiamonds, kingOfClubs]);

        var player1Meld = new RummyMeld(1);
        var player2Meld = new RummyMeld(2);
        var player3Meld1 = new RummyMeld(3);
        var player3Meld2 = new RummyMeld(3);
        player1Meld.meld([aceOfSpades, aceOfDiamonds, aceOfHearts]);
        player2Meld.meld([tenOfClubs, jackOfClubs, queenOfClubs]);
        player3Meld1.meld([threeOfDiamonds, fourOfDiamonds, fiveOfDiamonds]);
        player3Meld2.meld([sevenOfSpades, sevenOfHearts, sevenOfClubs]);

        game._melds = [player1Meld, player2Meld, player3Meld1, player3Meld2];
      });

      it("knows if adding to a set is valid", function() {
        game.selectCard(0);
        expect(game.canAddSelectedToSet()).toBe(false);

        game._hasDrawn = true;
        expect(game.canAddSelectedToSet()).toBe(true);

        game.deselectCard(0);
        expect(game.canAddSelectedToSet()).toBe(false);

        game.selectCard(4);
        expect(game.canAddSelectedToSet()).toBe(true);

        game.selectCard(0);
        expect(game.canAddSelectedToSet()).toBe(false);
      });
      describe("after drawing", function() {
        beforeEach(function() {
          game._hasDrawn = true;
        });

        it("allows adding to a set", function() {
          game.addSelectedToSet();
          expect(game.meldsForPlayer(1).length).toBe(1);
          expect(game.meldsForPlayer(1)[0].cards()).toEqual([aceOfSpades, aceOfDiamonds, aceOfHearts]);
          expect(game.meldsForPlayer(3)[1].cards()).toEqual([sevenOfSpades, sevenOfHearts, sevenOfClubs]);

          game.selectCard(0);
          game.selectCard(4);
          game.addSelectedToSet();
          expect(game.meldsForPlayer(1).length).toBe(1);
          expect(game.meldsForPlayer(1)[0].cards()).toEqual([aceOfSpades, aceOfDiamonds, aceOfHearts]);
          expect(game.meldsForPlayer(3)[1].cards()).toEqual([sevenOfSpades, sevenOfHearts, sevenOfClubs]);

          game.deselectCard(0);
          game.addSelectedToSet();
          expect(game.meldsForPlayer(1).length).toBe(2);
          expect(game.meldsForPlayer(1)[0].cards()).toEqual([aceOfSpades, aceOfDiamonds, aceOfHearts]);
          expect(game.meldsForPlayer(1)[1].cards()).toEqual([sevenOfDiamonds]);
          expect(game.meldsForPlayer(1)[1].isSet()).toBe(true);
          expect(game.meldsForPlayer(3)[1].cards()).toEqual([sevenOfSpades, sevenOfHearts, sevenOfClubs]);
          expect(game.player(1).cards().indexOf(sevenOfDiamonds)).toBe(-1);

          game.selectCard(0);
          game.addSelectedToSet();
          expect(game.meldsForPlayer(1).length).toBe(2);
          expect(game.meldsForPlayer(1)[0].cards()).toEqual([aceOfSpades, aceOfDiamonds, aceOfHearts, aceOfClubs]);
          expect(game.meldsForPlayer(3)[1].cards()).toEqual([sevenOfSpades, sevenOfHearts, sevenOfClubs]);
          expect(game.player(1).cards().indexOf(aceOfClubs)).toBe(-1);
        });
  });
});
