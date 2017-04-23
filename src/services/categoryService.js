export var categoryService = function(){
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
};   