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



              $scope.updateSelection = function($event){
                var checkboxValue = $event.target.id;
                    if ($scope.currentSelection.indexOf(checkboxValue) === -1) {
                         $scope.currentSelection.push(checkboxValue);
                    } else {
                        $scope.currentSelection.splice($scope.currentSelection.indexOf(checkboxValue), 1)
                    }
                        console.log($scope.currentSelection);
                    }


          });
