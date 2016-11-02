(function () {
  'use strict';

  angular
    .module('login.authentication.service', [
      'base64',
      'ngCookies'
    ])
    .factory('AuthenticationService', AuthenticationService);

//add endpoints for haystack as they come: 'endpoints'
  AuthenticationService.$inject = ['$base64', '$http', '$cookies', '$rootScope'];

  function AuthenticationService($base64, $http, $cookies, $rootScope, endpoints) {
    var service = {};

    service.validateLogin = validateLogin;
    service.login = login;
    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;
    service.hasCredentials = hasCredentials;

    return service;

    /**
     * @return {boolean}
     */
    function validateLogin(username, password) {
      var validUsername = validateUsername(username);
      var validPassword = validatePassword(password);

      return validUsername && validPassword;
    }

    /*
      Initiates login restful call and utilizes responseFunctions for success or failure conditions
     */
    function login(username, password, responseFunctions) {
      setCredentials(username, password);

      $http.post(endpoints.login)
        .then(function (response) {
          if (200 === response.data.code) {
            responseFunctions.LoginOnSuccess(response.data);
          } else {
            clearCredentials();
            responseFunctions.LoginOnFailure(response.data);
          }
        });
    }

    function encode(toBeEncoded) {
      return $base64.encode(toBeEncoded);
    }

    function setCredentials(username, password) {
      var authdata = encode(username + ":" + password);

      $rootScope.globals = {
        currentUser: {
          username: username,
          authdata: authdata
        }
      };

      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
      $cookies.put('globals', $rootScope.globals);
    }

    function clearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }

    /**
     * @return {boolean}
     */
    function hasCredentials() {
      var booleanResult = false;

      if (angular.isDefined($rootScope.globals)) {
        var value = $cookies.get('globals');

        if (value.length > 1) {
          booleanResult = true;
        }
      }
      return booleanResult;
    }
  }

  // private functions
  /**
   * @return {boolean}
   */
  function validateUsername(username) {
    var nameIsValid = false;

    if (username && username.length > 0) {
      nameIsValid = true;
    }

    return nameIsValid;
  }

  /**
   * @return {boolean}
   */
  function validatePassword(password) {
    var passIsValid = false;

    if (password && password.length > 0) {
      passIsValid = true;
    }

    return passIsValid;
  }
})();