/**
 * Signup view model
 */
var app = app || {};

app.Signup = (function () {
    'use strict';
    var signupViewModel = (function () {
        
        var dataSource;
        var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        
        // Executed after Signup view initialization
        // init form validator
        // Register user after required fields (username and password) are validated in Backend Services
        var signup = function () {

            Everlive.$.Users.register(
                dataSource.Username,
                dataSource.Password,
                dataSource)
            .then(function () {
                app.showAlert("Registration successful");
                app.mobileApp.navigate('#welcome');
            },
            function (err) {
                app.showError(err.message);
            });
        };
        
        var init = function () {
               
            console.log('signup init');
            
        }
        
        var show = function () {
               
            console.log('signup show');
            
        }
        
        var hide = function () {
               
            console.log('signup hide');
            
        }

        return {
            signup: signup,
            init: init,
            show: show,
            hide: hide
        };

    }());

    return signupViewModel;

}());