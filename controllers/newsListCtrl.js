    newsApp.controller('newsListCtrl', function($scope, newsService, categoryService){
    $scope.newsSources = [];
    $scope.tags = ['sports'];
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
