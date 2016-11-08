(function() {
    'use strict';

    // Declare app level module which depends on views and components
    angular.module('app', [
            'hs.libs',
            'hs.modules',
            // 'hs.components',
            // 'hs.features'
        ])
        .controller('rootController', ['$scope', '$state', '$mdSidenav', '$log', 'AuthenticationService', 'endpoints', function($scope, $state, $mdSidenav, $log, AuthenticationService, endpoints) {
            $scope.mdSideNav = true;
            $scope.toggleSideNav = buildToggler('left');
            $mdSidenav('left', true).then(function(instance) {

            });

            function buildToggler(navID) {
                return function() {
                    // Component lookup should always be available since we are not using `ng-if`
                    $mdSidenav(navID)
                        .toggle()
                        .then(function() {
                            $log.debug("toggle " + navID + " is done");
                        });
                }
            }


        }])
        .config(function($mdThemingProvider) {

            // Configure a theme here! 
            $mdThemingProvider.definePalette('amazingPaletteName', {
                '50': '#FFFFFF',
                '100': '#FFCCBC',
                '200': '#FFAB91',
                '300': '#FF8A65',
                '400': '#FF7043',
                '500': '#FF5722',
                '600': '#F4511E',
                '700': '#E64A19',
                '800': '#D84315',
                '900': '#BF360C',
                'A100': '#FF9E80',
                'A200': '#FF6E40',
                'A400': '#FF3D00',
                'A700': '#DD2C00',
                'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                // on this palette should be dark or light

                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined // could also specify this if default was 'dark'
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('amazingPaletteName')

        });

}());