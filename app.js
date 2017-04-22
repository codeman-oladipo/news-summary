'use strict';
var newsApp = angular.module('newsApp', ['ngRoute']);

(function () {
    newsApp.config(['$routeProvider',
        function (
            $routeProvider
        ) {
              $routeProvider.
                  when("/", {
                      templateUrl : "partials/home.html"
                  }).
                  when("/newsList/:newsID", {
                      templateUrl : "partials/news_list.html"
                  }).
                  when("/category", {
                      templateUrl : "partials/category.html"
                  }).
                  when("/add_channels", {
                      templateUrl : "partials/add_channels.html"
                  }).
                  when("/favorites", {
                      templateUrl : "partials/favorites.html"
                  }).
                  otherwise({
                      redirectTo: '/'
                  });
    }]);   
})();
