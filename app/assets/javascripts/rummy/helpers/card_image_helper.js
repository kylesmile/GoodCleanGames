Handlebars.registerHelper("imageClass", function() {
  return ("card-" + this.suit() + this.rank()).toLowerCase();
});