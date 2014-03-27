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
});
