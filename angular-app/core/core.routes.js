;(function () {
  'use strict'

  // Handles all the logic for navigation within the app
  // Declare app level module which depends on views, and components
  angular.module('app')

    .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', '$locationProvider', '$httpProvider',
      function ($stateProvider, $urlRouterProvider, $resourceProvider, $locationProvider, $httpProvider) {
        $stateProvider.decorator('parent', function (internalStateObj, parentFn) {
          // This fn is called by StateBuilder each time a state is registered

          // The first arg is the internal state. Capture it and add an accessor to public state object.
          internalStateObj.self.$$state = function () {
            return internalStateObj
          }

          // pass through to default .parent() function
          return parentFn(internalStateObj)
        })

        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;

        console.log('hi');
        $urlRouterProvider.when('/?goto=manufacturer', '/manufacturer');
        $urlRouterProvider.when('/?goto=retailer', '/retailer');
        $urlRouterProvider.when('/?goto=products', '/products');
        $urlRouterProvider.otherwise('/login')
        $locationProvider.html5Mode(true)

        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'modules/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
            title: 'Login'
          })

        $stateProvider
          .state('products', {
            url: '/products',
            templateUrl: 'modules/products/products.html',
            controller: 'productsController',
            controllerAs: 'product',
            title: 'Products'
          })

        $stateProvider
          .state('manufacturer', {
            url: '/manufacturer',
            templateUrl: 'modules/manufacturer/manufacturer.html',
            controller: 'manufacturerController',
            controllerAs: 'manufacturer',
            title: 'manufacturer'
          })

        $stateProvider
          .state('retailer', {
            url: '/retailer',
            templateUrl: 'modules/retailer/retailer.html',
            controller: 'retailerController',
            controllerAs: 'retailer',
            title: 'retailer'
          })

        $httpProvider.interceptors.push('ErrorInterceptor')
      }
    ])
})()
