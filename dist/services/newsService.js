'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var newsService = exports.newsService = function newsService() {
  newsApp.service('newsService', function ($http, $q) {
    var deferred = $q.defer();
    this.getSources = function () {
      $http.get('https://newsapi.org/v1/sources').then(function (response) {
        if (response) {
          deferred.resolve(response);
        }
        deferred.reject(response);
      }).catch(function (response) {
        console.log(response);
        deferred.reject(response);
      });
      return deferred.promise;
    };
  });
};