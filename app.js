
(function () {
   'use strict';
    var newsApp = angular.module('newsApp', ['ngRoute']);

    newsApp.config(['$routeProvider',
        function (
            $routeProvider
        ) {
              $routeProvider.
                  when("/", {
                      templateUrl : "partials/home.html"
                      // controller: 'HomeController'
                  }).
                  when("/newsList/:newsID", {
                      templateUrl : "partials/news_list.html"
                      // controller: 'AboutController'
                  }).
                  when("/category", {
                      templateUrl : "partials/category.html"
                  }).
                  otherwise({
                      redirectTo: '/'
                  });
    }]);

    newsApp.service('newsService', function($http, $q){
     var deferred = $q.defer();
     this.getSources = function(){
     $http.get('https://newsapi.org/v1/sources')
        .then(function(response) {
           if (response){
             deferred.resolve(response)
           }
             deferred.reject(response)
           })
        .catch(function (response) {
            console.log(response);
            deferred.reject(response);
        })
       return deferred.promise;
       }
    });

    newsApp.service('categoryService', function(){
        var selectedCategory = [];
        function setCategory(arr){
          selectedCategory = arr;
        };

        function getCategory() {
          return selectedCategory;
        }
        return {
          getCategory : getCategory,
          setCategory : setCategory
        }
    });


    newsApp.controller('newsDetailsCtrl', function($scope, $http, $routeParams){
        $scope.trimUrlWithDashOrbarckets = function(str){
            return str.toLowerCase().replace(/\(\)/ /gi,'-');
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


    newsApp.controller('newsListCtrl', function($scope, newsService, categoryService){
    $scope.newsSources = [];
    //console.log(UserPreferenceService.getCategory);


     newsService.getSources()
       .then(function(response){
         for (var item in response.data.sources){
          $scope.newsSources.push(response.data.sources[item])
         }
       })
       .catch(function(response){
          console.log(response);
       })

      console.log(categoryService.getCategory());
  });



  newsApp.controller('filterContent', function($scope, categoryService){
    $scope.newsCategory = ["general", "sports", "business", "technology", "politics", "entertainment", "gaming", "music", "science-and-nature"];
    $scope.currentSelection = [];

    $scope.updateSelection = function($event, id){
      var checkboxValue = $event.target.id;
          if ($scope.currentSelection.indexOf(checkboxValue) === -1) {
               $scope.currentSelection.push(checkboxValue);
          } else {
              $scope.currentSelection.splice($scope.currentSelection.indexOf(checkboxValue), 1)
          }
              console.log($scope.currentSelection);
              categoryService.setCategory($scope.currentSelection);
          }

      $scope.selectPrevious = function(){

      }

  })


})();
