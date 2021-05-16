var app = angular.module('timekeeper', ['ngRoute','ui.bootstrap', 'chart.js']);
app.config(function($routeProvider) {
   $routeProvider
    .when("/", {
        templateUrl: "app/templates/timer-template.htm",
        controller: 'timerCtrl',
   }).when("/graphs", {
       templateUrl: "app/templates/graphs-template.htm",
        controller: 'graphsCtrl',
   }).when("/projects", {
       templateUrl: "app/templates/projects-template.htm",
       controller: 'projectsCtrl',
   }).when("/groups", {
       templateUrl: "app/templates/groups-template.htm",
        controller: 'groupsCtrl',
   }).when("/settings", {
       templateUrl: "app/templates/settings-template.htm",
        controller: 'settingsCtrl',
   });
});
app.controller('navCtrl', function($scope, $location){
    $scope.location=$location.path().replace("/","");
    $scope.$on('$locationChangeSuccess', function () {
        $scope.location = $location.path().replace('/', '');
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