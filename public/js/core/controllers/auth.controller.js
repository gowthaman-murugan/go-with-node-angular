app.controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'Auth', function($scope, $location, $rootScope, Auth) {
    $scope.login = function(form) {
        Auth.login({
                'email': $scope.user.email,
                'password': $scope.user.password
            },
            function(err) {
                $scope.errors = {};
                if (!err) {
                    $location.path('/articles');
                } else {
                    angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoError', false);
                        $scope.errors[field] = error.type;
                    });
                    if(err.message)
                     $scope.error.other = err.message;
                }
            });
    };

}]).controller('SignupCtrl', ['$scope', '$location', '$rootScope', 'Auth', function($scope, $location, $rootScope, Auth) {
    $scope.register = function(form) {
        Auth.createUser({
                email: $scope.user.email,
                name: $scope.user.name,
                password: $scope.user.password
            },
            function(err) {
                $scope.errors = {};
                if (!err) {
                    $location.path('/articles');
                } else {
                    angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoError', false);
                        $scope.errors[field] = error.message;
                    });
                }
            }
        );
    };
}]);
