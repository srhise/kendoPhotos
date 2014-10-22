/**
 * Signup view model
 */
var app = app || {};

app.Login = (function () {
    'use strict';
    var loginViewModel = (function () {
        
        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);
        
        var $loginUsername;
        var $loginPassword;
        var isFacebookLogin = app.isKeySet(appSettings.facebook.appId) && app.isKeySet(appSettings.facebook.redirectUri);
        var isGoogleLogin = app.isKeySet(appSettings.google.clientId) && app.isKeySet(appSettings.google.redirectUri);
        
        $('#resetPassword').on('click', function () {
            resetPassword();
        });

        // Executed after Signup view initialization
        // init form validator
        var init = function () {

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');

        }

        var show = function () {

            $loginUsername.val('');
            $loginPassword.val('');

        }

        var login = function () {

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

        var resetPassword = function () {
            app.mobileApp.navigate('views/resetPassword.html');
        }

        // Authenticate using Facebook credentials
        var loginWithFacebook = function () {

            if (!isFacebookLogin) {
                return;
            }
            if (isInMistSimulator) {
                showMistAlert();
                return;
            }
            var facebookConfig = {
                name: 'Facebook',
                loginMethodName: 'loginWithFacebook',
                endpoint: 'https://www.facebook.com/dialog/oauth',
                response_type: 'token',
                client_id: appSettings.facebook.appId,
                redirect_uri: appSettings.facebook.redirectUri,
                access_type: 'online',
                scope: 'email',
                display: 'touch'
            };
            var facebook = new IdentityProvider(facebookConfig);
            //app.mobileApp.showLoading();

            facebook.getAccessToken(function (token) {
                app.everlive.Users.loginWithFacebook(token)
                    .then(function () {
                        // EQATEC analytics monitor - track login type
                        if (isAnalytics) {
                            analytics.TrackFeature('Login.Facebook');
                        }
                        return app.Users.load();
                    })
                    .then(function () {
                        //app.mobileApp.hideLoading();
                        app.mobileApp.navigate('views/photos.html');
                    })
                    .then(null, function (err) {
                        app.mobileApp.hideLoading();
                        if (err.code == 214) {
                            swal('The specified identity provider is not enabled in the backend portal.');
                        } else {
                            swal(err.message);
                        }
                    });
            });
        };

        var loginWithGoogle = function () {

            if (!isGoogleLogin) {
                return;
            }
            if (isInMistSimulator) {
                showMistAlert();
                return;
            }
            var googleConfig = {
                name: 'Google',
                loginMethodName: 'loginWithGoogle',
                endpoint: 'https://accounts.google.com/o/oauth2/auth',
                response_type: 'token',
                client_id: appSettings.google.clientId,
                redirect_uri: appSettings.google.redirectUri,
                scope: 'https://www.googleapis.com/auth/userinfo.profile',
                access_type: 'online',
                display: 'touch'
            };
            var google = new IdentityProvider(googleConfig);
            app.mobileApp.showLoading();

            google.getAccessToken(function (token) {
                app.everlive.Users.loginWithGoogle(token)
                    .then(function () {
                        // EQATEC analytics monitor - track login type
                        if (isAnalytics) {
                            analytics.TrackFeature('Login.Google');
                        }
                        return app.Users.load();
                    })
                    .then(function () {
                        app.mobileApp.hideLoading();
                        app.mobileApp.navigate('views/activitiesView.html');
                    })
                    .then(null, function (err) {
                        app.mobileApp.hideLoading();
                        if (err.code == 214) {
                            app.showError('The specified identity provider is not enabled in the backend portal.');
                        } else {
                            app.showError(err.message);
                        }
                    });
            });
        };
        
        var showMistAlert = function () {
            alert(appSettings.messages.mistSimulatorAlert);
        };

        return {
            init: init,
            show: show,
            login: login,
            loginWithFacebook: loginWithFacebook,
            loginWithGoogle: loginWithGoogle,
            resetPassword: resetPassword
        };

    }());

    return loginViewModel;

}());