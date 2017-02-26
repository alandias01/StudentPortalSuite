'use strict';

angular.module("app").config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: '/pages/main.html'
    })
    .when("/index", {
        templateUrl: '/pages/main.html'
    })
    .when("/indexmember.html", {
        templateUrl: '/pages/main.html'
    })        
    .when('/pages/algebra1/algebra1', {
        templateUrl: "pages/algebra1/algebra1.html"
    })
    .when('/pages/gre/gre', {
        templateUrl: "pages/gre/gre.html"
    })
    ;

    // use the HTML5 History API
    $locationProvider.html5Mode(true);


});

