describe("RummyMeld", function() {
  var aceOfSpades, aceOfDiamonds, aceOfClubs, aceOfHearts, twoOfSpades, threeOfSpades;

  beforeEach(function() {
    aceOfSpades = new RummyCard("A", "S");
    aceOfDiamonds = new RummyCard("A", "D");
    aceOfClubs = new RummyCard("A", "C");
    aceOfHearts = new RummyCard("A", "H");
    twoOfSpades = new RummyCard("2", "S");
    threeOfSpades = new RummyCard("3", "S");
  });

  it("can meld cards", function() {
    var meld1 = new RummyMeld;
    var meld2 = new RummyMeld;

    expect(meld1.size()).toBe(0);

    meld1.meld([aceOfSpades, aceOfDiamonds, aceOfClubs]);

    expect(meld1.size()).toBe(3);

    expect(meld1.cards()[0]).toBe(aceOfSpades);
    expect(meld1.cards()[1]).toBe(aceOfDiamonds);
    expect(meld1.cards()[2]).toBe(aceOfClubs);

    meld1.meld([aceOfHearts]);

    expect(meld1.size()).toBe(4);
    expect(meld1.cards()[3]).toBe(aceOfHearts);

    meld2.meld([twoOfSpades, threeOfSpades, aceOfSpades]);
    expect(meld2.cards()[0]).toBe(aceOfSpades);
    expect(meld2.cards()[1]).toBe(twoOfSpades);
    expect(meld2.cards()[2]).toBe(threeOfSpades);
  });

  it("is associated with a player number", function() {
    var meld = new RummyMeld(1);

    expect(meld.playerNumber()).toBe(1);
  });

  describe("runs and sets", function() {
    var setMeld, runMeld;
    beforeEach(function() {
      setMeld = new RummyMeld;
      setMeld.meld([aceOfDiamonds, aceOfHearts, aceOfClubs]);
      runMeld = new RummyMeld;
      runMeld.meld([aceOfSpades, twoOfSpades, threeOfSpades]);
    });

    it("can be a run or a set", function() {
      var emptyMeld = new RummyMeld;
      expect(emptyMeld.isSet()).toBe(false);
      expect(emptyMeld.isRun()).toBe(false);

      expect(setMeld.isSet()).toBe(true);
      expect(setMeld.isRun()).toBe(false);

      expect(runMeld.isRun()).toBe(true);
      expect(runMeld.isSet()).toBe(false);
    });

    it("allows setting its type if it has only 1 card", function() {
      var singleCardMeld = new RummyMeld;
      singleCardMeld.meld([aceOfDiamonds]);

      expect(singleCardMeld.isSet()).toBe(false);
      expect(singleCardMeld.isRun()).toBe(false);

      singleCardMeld.setType(RummyMeld.SET);
      expect(singleCardMeld.isSet()).toBe(true);
      expect(singleCardMeld.isRun()).toBe(false);

      singleCardMeld.setType(RummyMeld.RUN);
      expect(singleCardMeld.isSet()).toBe(false);
      expect(singleCardMeld.isRun()).toBe(true);

      setMeld.setType(RummyMeld.RUN);
      expect(setMeld.isSet()).toBe(true);
      expect(setMeld.isRun()).toBe(false);

      runMeld.setType(RummyMeld.SET);
      expect(runMeld.isSet()).toBe(false);
      expect(runMeld.isRun()).toBe(true);
    });

    describe("run", function() {
      it("knows its first and last cards", function() {
        expect(runMeld.first()).toBe(aceOfSpades);
        expect(runMeld.last()).toBe(threeOfSpades);

        expect(setMeld.first()).toBeUndefined();
        expect(setMeld.last()).toBeUndefined();
      });

      it("knows its suit", function() {
        expect(runMeld.suit()).toBe('S');
        expect(setMeld.suit()).toBeUndefined();
      });
    });

    describe("set", function() {
      it("knows its rank", function() {
        expect(setMeld.rank()).toBe('A');
        expect(runMeld.rank()).toBeUndefined();
      });
    });
  });
});
