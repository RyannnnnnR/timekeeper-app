var app = angular.module('timekeeper', ['ngRoute']);
app.config(function($routeProvider) {
   $routeProvider
    .when("/", {
        templateUrl: "templates/timer.template.htm",
        controller: 'timerCtrl',
        requireAuth: true
    }).when("/graphs", {
        templateUrl: "templates/graphs.template.htm",
        controller: 'graphsCtrl',
    }).when("/projects", {
        templateUrl: "templates/projects.template.htm",
        controller: 'projectsCtrl',
    }).when("/groups", {
        templateUrl: "templates/groups.template.htm",
        controller: 'groupsCtrl',
    }).when("/settings", {
        templateUrl: "templates/settings.template.htm",
        controller: 'settingsCtrl',
    }).when('/login', {
        templateUrl : 'views/login.html',
        controller: 'loginCtrl'
    }).otherwise({ redirectTo: '/login' });
});
app.controller('globalCtrl', function ($scope, $location, $window, UserService) {
    // intercept the route change event
    $scope.$on('$routeChangeStart', function (event, url) {
        console.log("Got")
        // check if the custom property exist
        if (url.requireAuth && !UserService.isUserLoggedIn()) {
            // user isn’t authenticated
            $location.path("/login");
        }
        if (UserService.isUserLoggedIn()) {
            $scope.isLoggedIn = true;
        }
        $scope.logout = function(){
            UserService.logout();
            $window.location.reload();
        }
    });
});
app.factory('entryFactory', function() {
    var factory = {};
    var entries = [{
        date: moment('12-05-2018', 'DD/MM/YYYY'),
        description: 'Worked on an interesting bug',
        start: moment('900', 'hmm'),
        end: moment('1234', 'hmm'),
        duration: moment.utc(moment('1234', 'hmm').diff(moment('900', 'hmm'))),
        project: 'timekeeper-web'
    }, {
        date: moment('12-05-2018', 'DD/MM/YYYY'),
        description: 'Worked on an interesting bug',
        start: moment('900', 'hmm'),
        end: moment('1234', 'hmm'),
        duration: moment.utc(moment('1234', 'hmm').diff(moment('900', 'hmm'))),
        project: 'timekeeper-api'
    }, {
        date: moment('12-05-2018', 'DD/MM/YYYY'),
        description: 'Worked on an interesting bug',
        start: moment('900', 'hmm'),
        end: moment('1234', 'hmm'),
        duration: moment.utc(moment('1234', 'hmm').diff(moment('900', 'hmm'))),
        project: 'bugger'
    }];
    factory.getEntries = function () {
        return entries;
    }
    return factory;
});
app.factory('projectsFactory', function() {
    var factory = {};
    var projects = [{name: 'timekeeper-web', members: ['Ryan Reichenberg', 'Tom Small', 'Dale Short']}, {name: 'timekeeper-api', members: ['Ryan Reichenberg', 'Tom Small', 'Dale Short']}, {name: 'bugger', members: ['Ryan Reichenberg', 'Tom Small', 'Dale Short']}];
    factory.getProjects = function () {
        return projects;
    }
    return factory;
});
app.factory('teamsFactory', function() {
    var factory = {};
    var teams = [];
    factory.getTeams = function () {
        return teams;
    }
    return factory;
});