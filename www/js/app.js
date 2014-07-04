// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todoapp', ['ionic', 'ngAnimate'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .factory('Projects', function () {
        return {
            load: function (name) {
                var projectString = window.localStorage[name];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (name, projects) {
                window.localStorage[name] = angular.toJson(projects);
            }
        }
    })

    .controller("ProjectToDoCtrl", ['$scope', 'Projects', function ($scope, Projects) {
        $scope.projects = Projects.load('projects');
        $scope.archive = Projects.load('archive');
        $scope.addstatus = false;
        $scope.searchStatus = false;
        $scope.iconOnClick = 'ion-ios7-plus-outline';

        $scope.addNewProject = function () {
            var newProject = $scope.projects.title;
            if (newProject.length > 0) {
                $scope.projects.push({id: $scope.projects.length, title: newProject});
                $scope.projects.title = '';
                Projects.save('projects', $scope.projects)
            }
        };

        $scope.addNewItem = function () {
            $scope.query = {};
            $scope.searchStatus = false;
            $scope.addstatus = !$scope.addstatus;
            $scope.iconOnClick = $scope.addstatus === false ? 'ion-ios7-plus-outline' : 'ion-ios7-checkmark-outline';
        };

        $scope.markAsDone = function (item) {
            var elementsIndex = $scope.projects.indexOf(item);
            //TODO add date
            $scope.archive.push({
                id: $scope.archive.length,
                title: $scope.projects[elementsIndex]["title"]
            });
            Projects.save('archive', $scope.archive);
            $scope.projects.splice(elementsIndex, 1);
            Projects.save('projects', $scope.projects)
        };

        $scope.search = function () {
            $scope.addstatus = false;
            $scope.clearSearch();
            $scope.searchStatus = !$scope.searchStatus;
        };

        $scope.clearSearch = function () {
            $scope.query = {}
        };

        $scope.cancelSearch = function () {
            $scope.searchStatus = false;
            $scope.query = {}
        }
    }]);
