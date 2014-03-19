Handlebars.registerHelper("indexIsSelected", function() {
  return Rummy.game.selectedIndices.indexOf(this) > -1
});