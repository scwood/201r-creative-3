angular.module('app', [])
  .controller('Controller', ['$scope', Controller])

function Controller($scope) {
  $scope.greeting = 'hello world'
}
