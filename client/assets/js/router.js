function Router(routes) {
    VT.obj_forEach(routes, function (item) {
        item.template = item.template || new Page(item.templateUrl, item.func);
    });
    this.routes = routes;
    console.log(this.routes);
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
}

Router.prototype.hashChanged = function () {
    var _this = this;
    if (window.location.hash.length > 0) {
        isAuth(function () {
            var pageName = window.location.hash.substr(1);
            if ( _this.routes[pageName] === undefined || pageName === 'login' ) {
                pageName = 'notFound';
            }

            var page = _this.routes[pageName].template;
            viewPage(pageName, page);
        });
    } else {
        isAuth(function () {
            var pageName = 'login';
            var page = _this.routes[pageName].template;
            viewPage(pageName, page);
        });
    }

    function viewPage(pageName, page) {
        if ( pageContent[pageName] === undefined ) {
            page.addScript(pageName);
            page.load(pageName);
        } else {
            page.show(pageName);
            page.execFunc(pageName);
        }
    }
};