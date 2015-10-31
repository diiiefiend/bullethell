//courtesy of
//https://github.com/jlongster/canvas-game-bootstrap/blob/a878158f39a91b19725f726675c752683c9e1c08/js/resources.js
(function() {
    window.BHGame = window.BHGame || {};
    window.BHGame.Resources = {};  //new namespace

    var resourceCache = BHGame.Resources.resourceCache = {};
    var loading = BHGame.Resources.loading = [];
    var readyCallbacks = BHGame.Resources.readyCallbacks = [];

    // Load an image url or an array of image urls
    var load = BHGame.Resources.load = function (urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    };

    var _load = BHGame.Resources._load = function (url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    };

    var get = BHGame.Resources.get = function (url) {
        return resourceCache[url];
    };

    var isReady = BHGame.Resources.isReady = function () {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    };

    var onReady = BHGame.Resources.onReady = function (func) {
        readyCallbacks.push(func);
    };

    // window.BHGame.resources = {
    //     load: load,
    //     get: get,
    //     onReady: onReady,
    //     isReady: isReady
    // };
})();
