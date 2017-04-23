'use strict';

var _newsService = require('services/newsService');

var newsService = _interopRequireWildcard(_newsService);

var _categoryServices = require('services/categoryServices');

var categoryServices = _interopRequireWildcard(_categoryServices);

var _newsListCtrl = require('controllers/newsListCtrl');

var newsListCtrl = _interopRequireWildcard(_newsListCtrl);

var _newsDetailsCtrl = require('controllers/newsDetailsCtrl');

var newsDetailsCtrl = _interopRequireWildcard(_newsDetailsCtrl);

var _filterContentCtrl = require('controllers/filterContentCtrl');

var filterContentCtrl = _interopRequireWildcard(_filterContentCtrl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var newsApp = angular.module('newsApp', ['ngRoute']);

(function () {
    newsApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "partials/home.html"
        }).when("/newsList/:newsID", {
            templateUrl: "partials/news_list.html"
        }).when("/category", {
            templateUrl: "partials/category.html"
        }).when("/add_channels", {
            templateUrl: "partials/add_channels.html"
        }).when("/favorites", {
            templateUrl: "partials/favorites.html"
        }).otherwise({
            redirectTo: '/'
        });
    }]);
})();