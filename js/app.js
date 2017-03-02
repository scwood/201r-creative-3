angular.module('app', [])
  .controller('todoController', ['$scope', todoController]);

function todoController($scope) {
  $scope.todos = [];
  $scope.newTodo = generateBlankTodo();
  loadTodosFromStorage();

  $scope.addTodo = function () {
    if ($scope.newTodo.text.trim() === '') {
      $scope.error = 'Todo must have some text';
      return;
    }
    var labels = $scope.newTodo.labels.split(',').map(function (label) {
      return label.trim();
    });
    var uniqueLabels = labels.filter(function (label, index) {
      return labels.indexOf(label) === index && label.trim() !== '';
    });
    $scope.newTodo.labels = uniqueLabels;
    $scope.todos.unshift($scope.newTodo);
    $scope.newTodo = generateBlankTodo();
    saveTodosToStorage();
    $scope.error = null;
  }

  $scope.deleteTodo = function (todo) {
    $scope.todos.splice($scope.todos.indexOf(todo), 1)
    saveTodosToStorage();
  }

  $scope.toggleDone = function (todo) {
    todo.isDone = !todo.isDone;
    saveTodosToStorage();
  }

  $scope.calculateOutstanding = function () {
    var outstanding = $scope.todos.filter(function (todo) {
      return !todo.isDone;
    });
    $scope.outstanding = outstanding.length;
    return outstanding;
  }

  function loadTodosFromStorage() {
    var todosFromStorage = localStorage.getItem('todos');
    if (todosFromStorage) {
      JSON.parse(todosFromStorage).forEach(function (todo) {
        $scope.todos.push(todo);
      });
    }
  }

  function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  }

  function generateBlankTodo() {
    return { text: '', isDone: false, labels: '' };
  }
}
