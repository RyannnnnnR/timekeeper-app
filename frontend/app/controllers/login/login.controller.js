app.controller('loginCtrl', function($scope, $window, UserService){
    $scope.incorrectLogin = false;
    $scope.login = function() {
        if (true) {
            UserService.login("1", "2");
            $window.location.href = '/';

        } else {
            $scope.incorrectLogin = true;
        }
    }
});