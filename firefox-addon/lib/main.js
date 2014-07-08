var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var prefs = require("sdk/simple-prefs").prefs;

function logUrl(tab) {
    Request({
        url: prefs.callbackUrl,
        headers: {
            "url": unescape(encodeURIComponent(tab.url)),
            "time": Date.now(),
            "title": unescape(encodeURIComponent(tab.title)),
        }
    }).post();
};

tabs.on("activate", function () { logUrl(tabs.activeTab) });
tabs.on("pageshow", function(tab) { logUrl(tab) });
