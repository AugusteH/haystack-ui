(function() {
    'use strict';

    angular.module('products.controller', [])


    .controller('productsController', ['$http', '$scope', 'endpoints', function($http, $scope, enpoints) {

        console.log('Products Controller locked and loaded');
        $scope.products;
        $http.get(enpoints.products)
            .success(function(data) {
                console.log(data, '---------------PRODUCT DATA');
                $scope.products = data;
            })
            .error(function(err) {
                console.log(err);
            })

    }]);

})();