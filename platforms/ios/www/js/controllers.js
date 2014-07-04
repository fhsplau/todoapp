var todoappControllers = angular.module("todoappControllers",[]);

todoappControllers.controller("ProjectToDoCtrl",function($scope) {
  $scope.projects=[];
  
  $scope.addNewProject = function(projects){
    var newProject = $scope.projects.title;
    $scope.projects.push({title:newProject});
    $scope.projects.title = '';
  };
});