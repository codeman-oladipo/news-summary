(function () {
  'use strict';

    var app= angular.module('newsApp');
    newsApp.controller('newsListCtrl', function($scope, newsService){
    $scope.newsSources = [];
    $scope.favorites = [];
    $scope.newsCategory = ["general", "sports", "business", "technology", "politics", "entertainment", "gaming", "music", "science-and-nature"];

     newsService.getSources()
       .then(function(response){
         for (var item in response.data.sources){
          $scope.newsSources.push(response.data.sources[item])
         }
       })
       .catch(function(response){
          console.log(response);
       })

       $scope.getSelections = function(){
         console.log($scope.favorites )
       }
  });
})();
