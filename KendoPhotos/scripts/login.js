/**
 * Signup view model
 */
var app = app || {};

app.Login = (function () {
    'use strict';
    var loginViewModel = (function () {

        // Executed after Signup view initialization
        // init form validator
        var init = function () {
               
            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');
            
        }
        
        var show = function() {
            
            $loginUsername.val('');
            $loginPassword.val('');            
        
        }

        var login = function() {

            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
            app.everlive.Users.login(username, password)
            .then(function () {
                // EQATEC analytics monitor - track login type
                if (isAnalytics) {
                    analytics.TrackFeature('Login.Regular');
                }

                return app.Users.load();
            })
            .then(function () {

                app.mobileApp.navigate('views/photos.html');
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        }
       
        return {
            init: init,
            show: show,
            login: login
        };

    }());

    return loginViewModel;

}());