Handlebars.registerHelper("imageClass", function() {
  return "card-" + this.suit().toLowerCase() + this.rank().toLowerCase();
});