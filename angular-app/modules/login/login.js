(function() {
    "use strict";

    angular.module('hs.login', [
            'login.authentication.service'
        ])
        .controller('LoginCtrl', ['$state', 'AuthenticationService',
            function($state, AuthenticationService) {

                // var loginCtrl = this;
                // loginCtrl.signin = signin;
                // loginCtrl.dataLoading = false;

                // var authServiceResponseFunctions = {};
                // authServiceResponseFunctions.LoginOnSuccess = LoginOnSuccess;
                // authServiceResponseFunctions.LoginOnFailure = LoginOnFailure;

                // /*
                //  Reset login status, if cookies are not detected
                //  Otherwise, if there are cookies, forward the user to Products view
                //  */
                // (function () {
                //   if (AuthenticationService.hasCredentials()) {
                //     $state.go('hs.products');
                //   } else {
                //     AuthenticationService.clearCredentials();
                //   }
                // })();

                // function signin() {
                //   loginCtrl.dataLoading = true;

                //   if (AuthenticationService.validateLogin(loginCtrl.username, loginCtrl.password)) {
                //     AuthenticationService.login(loginCtrl.username, loginCtrl.password,
                //       authServiceResponseFunctions);
                //   }
                // }

                // // private functions
                // function LoginOnSuccess() {
                //   $state.go('hs.products');
                //   loginCtrl.error = undefined;
                //   loginCtrl.dataLoading = false;
                // }

                // function LoginOnFailure(response) {
                //   loginCtrl.error = response.error;
                //   loginCtrl.dataLoading = false;
                // }
            }
        ]);
})();