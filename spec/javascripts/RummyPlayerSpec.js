describe("RummyPlayer", function() {
  var player;
  var aceOfSpades, threeOfHearts, sevenOfClubs, jackOfDiamonds, kingOfClubs;

  beforeEach(function() {
    player = new RummyPlayer;
    threeOfHearts = new RummyCard("3", "H");
    jackOfDiamonds = new RummyCard("J", "D");
    aceOfSpades = new RummyCard("A", "S");
    sevenOfClubs = new RummyCard("7", "H");
    kingOfClubs = new RummyCard("K", "C");
  });

  it("can take cards", function() {
    player.takeCard(aceOfSpades);

    expect(player.cards().get('content')[0]).toBe(aceOfSpades);

    player.takeCards([jackOfDiamonds, threeOfHearts]);

    expect(player.cards().get('content')[1]).toBe(threeOfHearts);
    expect(player.cards().get('content')[2]).toBe(jackOfDiamonds);
  });

  it("can play cards", function() {
    player.takeCards([aceOfSpades, jackOfDiamonds, threeOfHearts, sevenOfClubs, kingOfClubs]);

    var card = player.playIndices([1]);
    expect(card).toEqual([threeOfHearts]);
    expect(player.cards().get('length')).toBe(4);
    card = player.playIndices([1]);
    expect(card).toEqual([sevenOfClubs]);
    expect(player.cards().get('length')).toBe(3);

    var cards = player.playIndices([0, 1, 2]);
    expect(cards).toEqual([aceOfSpades, jackOfDiamonds, kingOfClubs]);
    expect(player.cards().get('length')).toBe(0);
  });

  it("sorts its cards", function() {
    player.takeCards([kingOfClubs, jackOfDiamonds, threeOfHearts, sevenOfClubs]);
    player.takeCard(aceOfSpades);
    var cards = player.cards().get('content');
    expect(cards[0]).toBe(aceOfSpades);
    expect(cards[1]).toBe(threeOfHearts);
    expect(cards[2]).toBe(sevenOfClubs);
    expect(cards[3]).toBe(jackOfDiamonds);
    expect(cards[4]).toBe(kingOfClubs);
  });
});
