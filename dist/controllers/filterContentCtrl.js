"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var filterContent = exports.filterContent = function filterContent() {
    newsApp.controller('filterContent', function ($scope, categoryService) {
        $scope.newsCategory = ["general", "sports", "business", "technology", "politics", "entertainment", "gaming", "music", "science-and-nature"];
        $scope.currentSelection = [];

        $scope.updateSelection = function ($event, id) {
            var checkboxValue = $event.target.id;
            if ($scope.currentSelection.indexOf(checkboxValue) === -1) {
                $scope.currentSelection.push(checkboxValue);
            } else {
                $scope.currentSelection.splice($scope.currentSelection.indexOf(checkboxValue), 1);
            }
            console.log($scope.currentSelection);
            categoryService.setCategory($scope.currentSelection);
        };
    });
};