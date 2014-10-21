/**
 * Signup view model
 */
var app = app || {};

app.resetPassword = (function () {
    'use strict';
    var loginViewModel = (function () {

        var $userName;

        // Executed after Signup view initialization
        // init form validator
        var init = function () {

            $userName = $('#username');

        }

        var show = function () {

            $userName.val('');

        }

        var reset = function () {

           $userName = $userName.val();

            var object = {
                "Username": $userName
            };
            
            $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/'+app.everlive.setup.apiKey+'/Users/resetpassword',
                contentType: "application/json",
                data: JSON.stringify(object),
                success: function (data) {
                    alert("Password is reset.");
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        }

        return {
            init: init,
            show: show,
            reset: reset
        };

    }());

    return loginViewModel;

}());