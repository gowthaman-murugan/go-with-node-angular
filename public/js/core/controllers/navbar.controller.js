app.controller('NavbarCtrl', ['$scope', '$rootScope', '$location', 'Auth', function($scope, $rootScope, $location, Auth) {
    $rootScope.myTheme = "blueGrey";

    $scope.availableThemes = {
        BlueGrey: 'blueGrey',
        Blue: 'blue',
        Cyan: 'cyan',
        Green: 'green',
        Teal: 'teal'
    };

    $scope.newTheme = function(val) {
         if (val != undefined) {
            $rootScope.myTheme = val;
        }
    }

    $scope.logout = function() {
        Auth.logout(function(err) {
            $location.path('/login');
            /*if (!err) {
                $location.path('/login');
            }*/
        });
    };
}]);
