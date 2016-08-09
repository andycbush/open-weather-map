angular.module('OWMApp', ['ngRoute'])

.value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl as home'
            })
            .when('/error', {
                template: '<p>Error - Page Not Found</p>'
            })
            .when('/cities/:city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function (owmCities, $route, $location) {
                        var city = $route.current.params.city;
                        if (owmCities.indexOf(city) === -1) {
                            $location.path('/error');
                            return;
                        }
                        return city;
                    }
                }
            })
            .otherwise({
                redirectTo: '/error'
            });
    })
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function () {
            $location.path('/error');
        })
    })


.controller('HomeCtrl', function () {
    this.welcomeMessage = 'Welcome back home!';
})

.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
});





/*
angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        }).when('/city', {
            templateUrl: 'city.html',
            controller: 'CityCtrl'
        });
    }])
    .controller('HomeCtrl', function ($scope) {
        //empty for now
    })
    .controller('CityCtrl', function ($scope, $routeParams) {
        $scope.city = $routeParams.city;
    });
*/
/*
angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', function($scope) {
    //empty for now
});
*/
