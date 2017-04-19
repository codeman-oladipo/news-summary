
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


//    newsApp.service('html5localStorage', function(){
//             var self = this;
//             var vm = {};
//             vm.saveData = saveData;
//             vm.resetAllData = resetAllData;
//             vm.displayData = displayData;
//
//
//          function saveData(item){
//            localStorage.setItem('localStorageIdentifier', JSON.stringify(item));
//            console.log(item + " - Saved!!!!")
//          }
//
//          function displayData(){
//            return JSON.parse(localStorage.getItem('localStorageIdentifier'));
//          }
//
//          function resetAllData(){
//            localStorage.removeItem('localStorageIdentifier');
//            console.log("Data erased!!!!");
//          }
//
//        return self;
//
//        });



    newsApp.controller('saveNewsChannels', function($scope, $http){
      $scope.channelNames = [];
      $scope.currentSelection = [];


         var data = $http({
                     method: 'GET',
                       url: 'js/data.json'
                           }).then(function(response) {

                                for (var i in response.data) {
                                  $scope.channelNames.push( response.data[i].name)
                                }
                    //  console.log($scope.channelNames)
                    }, function(response) {
                 console.log(response)
              });
        
        



                 var htmlLocalStorage = function(){
                
                          this.saveData = function(){
                            localStorage.setItem('preferedChannels', JSON.stringify($scope.currentSelection));
                            console.log($scope.currentSelection + " - Saved!!!!")
                          }
                
                          this.resetAllData = function(){
                            localStorage.removeItem('preferedChannels');
                            console.log("Data erased!!!!");
                          }
                
                          this.displayData = function(){
                            var data = JSON.parse(localStorage.getItem('preferedChannels'));
                            $scope.favorites = data;
                
                            console.log(data);
                            return data;
                          }
                
                       }
                




                   var mylocalStorage = new htmlLocalStorage();
                   $scope.saveChannels = mylocalStorage.saveData;
                   $scope.displayData = mylocalStorage.displayData;
                   $scope.resetAllData = mylocalStorage.resetAllData;
                   mylocalStorage.displayData();


//                  $scope.saveChannels = html5localStorage.saveData($scope.currentSelection);
//                  $scope.resetAllData = html5localStorage.resetAllData;
//                  $scope.displayData = html5localStorage.displayData;
//                  html5localStorage.displayData();



              $scope.updateSelection = function($event){
                var checkboxValue = $event.target.id;
                    if ($scope.currentSelection.indexOf(checkboxValue) === -1) {
                         $scope.currentSelection.push(checkboxValue);
                    } else {
                        $scope.currentSelection.splice($scope.currentSelection.indexOf(checkboxValue), 1)
                    }
                        console.log($scope.currentSelection);
                    }



                    //
                    //
                    // if ($scope.favorites != ""){
                    //   for (var i = 0 ; i <= $scope.channelNames.length; i++) {
                    //      if ($scope.channelNames[i] == $scope.favorites[i]) {
                    //
                    //        console.log($scope.channelNames[i]);
                    //      }
                    //   }
                    // }


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
        var trimUrlWithDashOrbarckets = function(str){
        return str.toLowerCase().replace(/([()])/g, "").replace(/\s/g, '-');
        }
        $scope.source = trimUrlWithDashOrbarckets($routeParams.newsID) || 'bbc-news';
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
    newsService.getSources()
       .then(function(response){
         for (var item in response.data.sources){
          $scope.newsSources.push(response.data.sources[item]);
         }
        console.log($scope.newsSources);
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

      $scope.resetSelection = function(){}

  });


})();
