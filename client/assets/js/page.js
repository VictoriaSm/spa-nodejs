var el = document.querySelector('#main');

var pageContent = {};
var scriptFlag = {};

function Page( url, needFn ) {
    this.needFn = needFn;
    this.url = './views/' + url;
    this.scriptLoaded = false;
    this.pageLoaded = false;
}

Page.prototype.addScript =  function ( path ) {
    var _this = this;
    var script = document.createElement('script');
    script.src = './assets/js/controllers/' + path + '.js';
    document.head.appendChild(script);
    script.onload = function(){
        scriptFlag[path] = true;
        _this.execFuncF(path,'script');
    }
};

Page.prototype.load = function (path) {
    var _this = this;
    if(!path){
        return console.error(404);
    }
    VT.send( "GET", this.url, {}, errorHandler, render );

    function render(res){
        el.innerHTML = res;
        pageContent[path] = res;
        _this.execFuncF(path, 'page');
    }

    function errorHandler(code, error) {
        console.error(code.error, error);
    }
};

Page.prototype.show = function (path) {
    el.innerHTML = pageContent[path];
};

Page.prototype.execFuncF = function (path, type) {
    if(type === 'page'){
        this.pageLoaded = true;
    }
    if(type === 'script'){
        this.scriptLoaded = true;
    }
    if (this.pageLoaded && this.scriptLoaded && this.needFn){
        window[path + 'Func']();
    }
};

Page.prototype.execFunc = function (path) {
    if ( scriptFlag[path] && this.needFn) {
        window[path + 'Func']();
    }
};