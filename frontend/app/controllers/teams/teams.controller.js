app.controller('teamsCtrl', function($scope, entryFactory){
    $scope.message = entryFactory.getEntries();
});