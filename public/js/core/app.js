var app = angular.module('app', ['ui.router', 'ngResource',  'datatables', 'ngCookies']);
app.config(['$stateProvider', '$httpProvider', function($stateProvider, $httpProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        }).state('signup', {
            url: '/signup',
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        }).state('articles', {
            url: '/articles',
            templateUrl: 'partials/articles.html',
            controller: 'ArticleController'
        }).state('newArticle', {
            url: '/article/new',
            templateUrl: 'partials/article-form.html',
            controller: 'ArticleCreateController'
        }).state('editArticle', {
            url: '/article/:id/edit',
            templateUrl: 'partials/article-form.html',
            controller: 'ArticleCreateController'
        });
}]).run(['$location', '$rootScope', '$cookieStore', function($location, $rootScope, $cookieStore) {
     $rootScope.currentUser = $cookieStore.get('user') || null;
     $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/signup']) === -1;
        if (restrictedPage && $rootScope.currentUser == null) {
            $location.path('/login');
        }
    });
     $rootScope.$watch('myTheme', function(value) {
         if (value != undefined) {
             $rootScope.myTheme = value;

        }
    });

}]);
