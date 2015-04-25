/**
 * Created by Smart on 20-Apr-15.
 */
var app = angular.module('todoList', ['ngMaterial']);

app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
        return function() {
            return $mdSidenav(navID).toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

    $scope.clearCompleteWork=function(){
        angular.forEach(check,function(value)
        {
            todo.splice(todo.indexOf(value),1);
        });
        check=[];
    }

});

var todo=[];

app.service("addInTodo", function () {

    this.saveInTodo= function ($note) {
        todo.push($note);
    }

    this.getNote= function () {
        return todo;
    }
});

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log,addInTodo) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }

      $scope.clicks=function(){

          var noteData={
              face: './image/ali.jpeg',
              notes:$scope.dataInput,
              checked:'false'
          };

          addInTodo.saveInTodo(noteData);
          $scope.dataInput="";
      };
  });

var check=[];

app.controller('listCtrl', function($scope,addInTodo) {
    $scope.todos=addInTodo.getNote();

    $scope.checked=function(note){
        if(check.indexOf(note)=== -1)
        {
            check.push(note);
        }
        else
        {
            check.splice(check.indexOf(note),1);
        }
    }
});

