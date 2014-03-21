window.Rummy = Ember.Application.create({
  rootElement: 'section.game',
  game: new RummyGame(2)
});

Rummy.bot = new RummyBot(Rummy.game);