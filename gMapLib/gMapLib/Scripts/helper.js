var BrowserUtilities = (function () {
    function BrowserUtilities() {
    }
    BrowserUtilities.prototype.checkMobile = function () {
        var useragent = navigator.userAgent;
        return (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1);
    };

    BrowserUtilities.prototype.loadVisualAsync = function (elementId, elementAttribute, url) {
        elementId = elementId.trim();
        elementAttribute = elementAttribute.trim();
        url = url.trim();

        if (elementId.length != 0 && elementAttribute.length != 0 && url.length != 0) {
            var element = document.getElementById(elementId);
            element.setAttribute(elementAttribute, url);
        }
    };

    BrowserUtilities.prototype.indexOf = function (arr, obj) {
        for (var i = -1, j = arr.length; ++i < j;)
            if (arr[i] === obj)
                return i;
    };

    BrowserUtilities.prototype.loadScriptAsync = function (url, callback) {
        url = url.trim();

        if (url.length != 0) {
            var script = document.createElement('script');
            script.type = 'text/javascript';

            if (callback == null)
                callback = "";
            else
                callback = callback.trim();

            if (callback.length != 0)
                script.src = url + '&callback=' + callback;
            else
                script.src = url;

            document.body.appendChild(script);
        }
    };
    return BrowserUtilities;
})();
