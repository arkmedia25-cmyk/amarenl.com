define(function () {
    var $ = require(["jquery"])
    var possibleBundlePacks;
    var possibleBundleItems;
    function getQueryString(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }
    function imgError(img) {
        img.onerror = "";
        if (navigator.userAgent.match(/Trident\/7\./)) { // if IE

            img.attr("src", "/content/images/shopping/product-default.png");
        } else {
            img.src = "/content/images/shopping/product-default.png";
        }
        return true;
    }
    function getPossibleBundlePacks() {
        return possibleBundlePacks;
    }
    function setPossibleBundlePacks(packs) {
        possibleBundlePacks = packs;
        return true;
    }
    function getPossibleBundleItems() {
        return possibleBundleItems;
    }
    function setPossibleBundleItems(items) {
        possibleBundleItems = items;
        return true;
    }
    return {
        getQueryString: getQueryString,
        imgError: imgError,
        getPossibleBundlePacks: getPossibleBundlePacks,
        setPossibleBundlePacks: setPossibleBundlePacks,
        getPossibleBundleItems: getPossibleBundleItems,
        setPossibleBundleItems: setPossibleBundleItems
    }

});