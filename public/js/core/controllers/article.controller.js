app.controller('ArticleController', ['$scope', '$rootScope', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Article', function($scope, $rootScope, $state, DTOptionsBuilder, DTColumnDefBuilder, Article) {
    $scope.articles = Article.query();
    $scope.persons = $scope.articles;
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];

}]).controller('ArticleCreateController', ['$scope', '$location', '$stateParams', 'Article', function($scope, $location, $stateParams, Article) {

    $scope.article = {};
    if ($stateParams.id) {
        $scope.article = Article.get({
            id: $stateParams.id
        });
    }
    $scope.saveOrUpdate = function(form) {
        if ($scope.article) {
            if ($scope.article._id) {
                Article.update($scope.article, function(article, err) {
                    if (article) {
                        //$location.path('/articles');
                        $scope.msg = {
                            css: 'alert-success',
                            message: 'You successfully updated article'
                        }
                    } else {
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoError', false);
                            $scope.errors[field] = error.message;
                        });
                    }
                });
            } else {
                Article.save($scope.article, function(article, err) {
                    if (article) {
                        //$location.path('/articles');
                        $scope.msg = {
                            css: 'alert-success',
                            message: 'You successfully created article'
                        }
                    } else {
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoError', false);
                            $scope.errors[field] = error.message;
                        });
                    }
                });
            }

        }

    }

}]);
