(function() {
    'use strict';

    angular.module('products.controller', [])


    .controller('productsController', ['$http', '$scope', 'endpoints', function($http, $scope, enpoints) {

        console.log('Products Controller locked and loaded');

        //  $http.get(enpoints.products)
        //         .success(function(data){
        //             console.log(data, '---------------PRODUCT DATA');
        //         })
        //         .error(function(err){
        //             console.log(err);
        //         })



    }]);

})();