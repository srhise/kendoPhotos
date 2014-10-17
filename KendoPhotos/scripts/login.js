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
               
            console.log('login init');
            
        }
        
        var show = function() {
            
            console.log('login show');
            
        }
       
        return {
            init: init,
            show: show
        };

    }());

    return loginViewModel;

}());