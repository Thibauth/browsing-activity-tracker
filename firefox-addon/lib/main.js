var windows = require("sdk/windows").browserWindows;
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var prefs = require("sdk/simple-prefs").prefs;

function logUrl(tab) {
    if (tab !== tabs.activeTab) {
        return;
    }
    Request({
        url: prefs.callbackUrl,
        headers: {
            "url": unescape(encodeURIComponent(tab.url)),
            "time": Date.now(),
            "title": unescape(encodeURIComponent(tab.title)),
        }
    }).post();
};

function logDesactivate() {
    Request({
        url: prefs.callbackUrl,
        headers: {
            "url": null,
            "time": Date.now(),
            "title": null,
        }
    }).post();
}

tabs.on("activate", function () { logUrl(tabs.activeTab) });
tabs.on("pageshow", function(tab) { logUrl(tab) });
windows.on("activate", function () { logUrl(tabs.activeTab) });
windows.on("deactivate", function () { logDesactivate() });
