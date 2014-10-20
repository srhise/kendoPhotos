var app = (function (win) {
    'use strict';

    // Global error handling
    var showAlert = function (message, title, callback) {
        navigator.notification.alert(message, callback || function () {}, title, 'OK');
    };

    var showError = function (message) {
        showAlert(message, 'Error occured');
    };

    // Global confirm dialog
    var showConfirm = function (message, title, callback) {
        navigator.notification.confirm(message, callback || function () {}, title, ['OK', 'Cancel']);
    };

    var el = new Everlive({
        apiKey: appSettings.everlive.apiKey,
        scheme: appSettings.everlive.scheme
    });

    var onDeviceReady = function () {
        
        window.listView = kendo.observable({
            addImage: function () {
                var success = function (data) {
                    everlive.Files.create({
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                        ContentType: "image/jpeg",
                        base64: data
                    }).then(loadPhotos);
                };
                var error = function () {
                    navigator.notification.alert("Unfortunately we could not add the image");
                };
                var config = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    targetHeight: 400,
                    targetWidth: 400
                };
                navigator.camera.getPicture(success, error, config);
            },
            switchView: function () {
                alert('test');
                $.mobile.changePage('#tabstrip-home', {
                    transition: 'flip'
                });
            }
        });

        //loadPhotos();

    };

    // Handle "deviceready" event
    document.addEventListener('deviceready', onDeviceReady, false);

    function loadPhotos() {
        everlive.Files.get().then(function (data) {
            var files = [];
            data.result.forEach(function (image) {
                files.push(image.Uri);
            });
            $("#images").kendoMobileListView({
                dataSource: files,
                template: "<img src='#: data #'>"
            });
        });
    }

    var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

    var mobileApp = new kendo.mobile.Application(document.body, {
        transition: 'none',
        statusBarStyle: statusBarStyle,
        skin: 'flat'
    });

    return {
        showAlert: showAlert,
        showError: showError,
        showConfirm: showConfirm,
        loadPhotos: loadPhotos,
        mobileApp: mobileApp,
        everlive: el
    };
}(window));