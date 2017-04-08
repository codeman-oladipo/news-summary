
  (function () {
    'use strict';

      var app= angular.module('newsApp');
      newsApp.controller('newsDetailsCtrl', ['$scope', function ($scope, $http, $routeParams) {
          $scope.trimUrlWithDashOrbarckets = function(str){
              return str.toLowerCase().replace(/ /gi,'-');
          }
          $scope.source = $scope.trimUrlWithDashOrbarckets($routeParams.newsID) || 'bbc-news';
          console.log($scope.source)
          $scope.newsArticles = [];
          $scope.getArticles = function(source){
          $http({
              method : "GET",
              url : 'https://newsapi.org/v1/articles?source='+source+'&apiKey=cbbf845e87d94bfa99f0f1419fbe6b00'
          }).then(function success(response){
              $scope.data = response.data.articles;
                  for (var item in $scope.data){
                     $scope.newsArticles.push($scope.data[item]);
                  }
                  console.log($scope.newsArticles);
          }, function err(response){
              $scope.data = response.statusText;
          });
          };
         $scope.getArticles($scope.source);
      });
}());
