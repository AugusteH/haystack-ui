(function () {
  'use strict';

  // Handles problems loading to one of the app's pages, then intercepts and defines the type for the routes to handle
  angular.module('app')
    .service('ErrorInterceptor', ['$injector', '$q', function ($injector, $q) {

      var responseError = function (error) {
        var $state = $injector.get('$state');
        if (error.status === 500) {
          $state.go('hs.error', {
            'type': 500
          });
        } else if (error.status === 404) {
          $state.go('hs.error', {
            'type': 404
          });
        }
        return $q.reject(error);
      };

      var requestError = function (error) {
        var $state = $injector.get('$state');
        if (error.status === 500) {
          $state.go('hs.error', {
            'type': 500
          });
        } else if (error.status === 404) {
          $state.go('hs.error', {
            'type': 404
          });
        }
        return $q.reject(error);
      };

      return {
        responseError: responseError,
        requestError: requestError
      };
    }]);
}());