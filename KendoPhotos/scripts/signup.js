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
            $signUpForm = $('#signUp');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#signupBtnWrp');
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
            
        }
        
        var show = function () {
               
            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: ''
            });
            kendo.bind($('#signUp'), dataSource, kendo.mobile.ui);
            
        }
        
        var hide = function () {
               
            $signupBtnWrp.addClass('disabled');
            
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