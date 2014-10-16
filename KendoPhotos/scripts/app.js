(function () {
    document.addEventListener("deviceready", function () {

        var everlive = new Everlive("TdXqRePUqA8r1sdV");
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
            switchView: function() {
                alert('test');
                $.mobile.changePage('#tabstrip-home', { transition: 'flip' });
            }
        });

        //skin declaration
        var app = new kendo.mobile.Application(document.body, {
            platform: "ios7",
            layout: "tabstrip-layout"
        });

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
        loadPhotos();


    });
}());