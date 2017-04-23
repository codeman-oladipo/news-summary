'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var categoryService = exports.categoryService = function categoryService() {
  newsApp.service('categoryService', function () {
    var selectedCategory = [];
    function setCategory(arr) {
      selectedCategory = arr;
    };

    function getCategory() {
      return selectedCategory;
    }
    return {
      getCategory: getCategory,
      setCategory: setCategory
    };
  });
};