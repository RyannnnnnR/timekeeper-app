app.controller('loginCtrl', function($scope, $window){
    $scope.incorrectLogin = false;
    $scope.login = function() {
        if ($scope.email == 'test@test.com' && $scope.password == 'password') {
            $window.location.href = '/timekeeper-web/index.html';
        } else {
            $scope.incorrectLogin = true;
        }
    }
});