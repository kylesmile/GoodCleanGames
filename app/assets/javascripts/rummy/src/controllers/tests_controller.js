angular.module('rummyApp')
  .controller('TestsController', ['$scope', 'Adapter', function($scope, Adapter) {
    $scope.rigForMeld = function() {
      var player = Adapter.game.player(1);
      player.cards().splice(0, 3);
      player.takeCards([new RummyCard('A', 'S'), new RummyCard('A', 'D'), new RummyCard('A', 'H')]);
      Adapter.game.draw();
    };
  }]);