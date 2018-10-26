(function ($) {

  $.spapp = function (options) {

    // set config and routes
    var config, routes = {};

    config = $.extend({
      defaultView:"view_home",
      templateDir: './pages/',
      pageNotFound: false
    }, options);

    $("main#spapp > section").each(function (k, e) {
      var elm = $(this);
      routes[elm.attr("id")] = {
        view: elm.attr("id"),
        load: elm.data("load"),
        script: elm.data("script"),
        style: elm.data("style"),
        onCreate: function () {},
        onReady: function () {}
      };
    });
    // update rotues programatically
    this.route = function (options) {
      $.extend(routes[options.view], options);
    };

    // manage hash change
    var routeChange = function () {
      var id = location.hash.slice(1);
      var route = routes[id];
      var elm = $("#" + id);

      if (!elm || !route) {
        if (config.pageNotFound) {
          window.location.hash = config.pageNotFound;
          return;
        }
        console.log(id + " not defined");
        return;
      }

      if (elm.hasClass("spapp-created")) {
        route.onReady();
      } else {
        elm.addClass("spapp-created");
        if (!route.load && !rout.script) {
          route.onCreate();
          route.onReady();
        } else {
          $.when(
            elm.load(config.templateDir + route.load, function () {
              // Done!
            }),
            $.getScript(config.templateDir + route.script, function (data, textStatus, jqxhr) {
              // Done!
            }),
            $('<link>')
            .appendTo('head')
            .attr({
                type: 'text/css',
                rel: 'stylesheet',
                href: config.templateDir + route.style
            })
          ).then(function () {
            route.onCreate();
            route.onReady();
          });
        }
      }
    };

    // and run
    this.run = function () {
      window.addEventListener('hashchange', function () {
        routeChange();
      });
      if (!window.location.hash) {
        window.location.hash = config.defaultView;
      } else {
        routeChange();
      }
    };

    return this;
  };

}(jQuery));