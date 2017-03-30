var newsApp = angular.module('newsApp', ['ngRoute']);

newsApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/home.html"
    })
     .when("/newsList/:newsID", {
        templateUrl : "partials/news_list.html"
      })
      .when("/category", {
          templateUrl : "partials/category.html"
      })
});


newsApp.controller('newsDetailsCtrl', function($scope, $http, $routeParams){
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

// Call for news source via API - https://newsapi.org/v1/sources
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


newsApp.controller('newsListCtrl', function($scope, newsService){
$scope.newsSources = [];
$scope.favorites = [];
$scope.newsCategory = ["general", "sports", "business", "technology", "politics", "entertainment", "gaming", "music", "science-and-nature"];

     newsService.getSources()
       .then(function(response){
         for (var item in response.data.sources){
             $scope.newsSources.push(response.data.sources[item])
            //  console.log(response.data.sources[item].name)
         }
       })
       .catch(function(response){
         console.log(response);
       })

 $scope.getSelections = function(){
   console.log($scope.favorites )
 }
});
