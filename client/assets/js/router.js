function Router(routes) {
    VT.obj_forEach(routes, function (item) {
        item.template = item.template || new Page(item.templateUrl, item.func);
    });
    this.routes = routes;
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
}

Router.prototype.hashChanged = function () {
    isAuth();
    if (window.location.hash.length > 0) {
        var pageName = window.location.hash.substr(1);
        var page = this.routes[pageName].template;

        if ( pageContent[pageName] === undefined ) {
            page.addScript(pageName);
            page.load(pageName);
        } else {
            page.show(pageName);
            page.execFunc(pageName);
        }
    }
};