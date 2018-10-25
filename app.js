$(document).ready(function () {

    $("main#spapp > section").height($(document).height() - 60);

    var app = $.spapp({
        pageNotFound: 'error_404'
    }); // initialize
    var includeJs = [
        "function.js"
    ];
    (function () {
        return $.when.apply($, $.map(includeJs, function (n, i) {
            var def = new $.Deferred();
            $.getScript(n, function () {
                def.resolve();
            });
            return def;
        })).promise();
    }(jQuery)).done(function (results) {
        // define routes
        app.route({
            view: 'view_home',
            load: 'home/home.html',
            script: 'home/home.controller.js',
            style: 'home/home.css',
            onCreate: function () {},
            onReady: function () {}
        });
        app.route({
            view: 'view_about',
            load: 'about/about.html',
            script: 'about/about.controller.js',
            style: 'about/about.css',
            onCreate: function () {
                $("#view_about").append($.now() + ': Written on create<br/>');
            },
            onReady: function () {
                $("#view_about").append($.now() + ': Written when ready<br/>');
            }
        });
        app.route({
            view: 'view_contact',
            load: 'contact/contact.html',
            script: 'contact/contact.controller.js',
            style: 'contact/contact.css',
            onCreate: function () {},
            onReady: function () {}
        });

        // run app
        app.run();

        $("#wrapper").toggleClass("toggled");

        function loadScript(name) {
            let scripts = Array
                .from(document.querySelectorAll('script'))
                .map(scr => scr.src);

            if (!scripts.includes(name)) {
                var tag = document.createElement('script');
                tag.src = name;
                document.getElementsByTagName('body')[0].appendChild(tag);
            }
        }
    });
});