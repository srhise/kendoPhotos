/**
 * Signup view model
 */
var app = app || {};

app.Login = (function () {
    'use strict';
    var loginViewModel = (function () {

        var $loginUsername;
        var $loginPassword;
        
        $('#resetPassword').on('click', function() {
              resetPassword(); 
        });
        
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
                if (typeof isAnalytics != "undefined") {
                    analytics.TrackFeature('Login.Regular');
                }

                return app.Users.load();
            })
            .then(function () {

                app.mobileApp.navigate('views/photos.html');
            })
            .then(null,
                  function (err) {
                      swal(err.message);
                  }
            );
            
        }
        
        var resetPassword = function() {
            app.mobileApp.navigate('views/resetPassword.html');
        }
       
        return {
            init: init,
            show: show,
            login: login,
            resetPassword: resetPassword
        };

    }());

    return loginViewModel;

}());