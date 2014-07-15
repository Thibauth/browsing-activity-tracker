var windows = require("sdk/windows").browserWindows;
var tabs = require("sdk/tabs");
var { Request } = require("sdk/request");
var { prefs } = require("sdk/simple-prefs");
var { XMLHttpRequest } = require("sdk/net/xhr");
var { getFavicon } = require("sdk/places/favicon");

var previous_window = null;

function log(url, title, favicon){
    var data = JSON.stringify({
        url: url, time: Date.now(),
        title: title, key: prefs.key,
        favicon: favicon
    });
    var xhr = new XMLHttpRequest();
    xhr.open("POST", prefs.callback);
    xhr.send(data);
}

function logTab(tab) {
    if (tab.id === tabs.activeTab.id) {
        getFavicon(tab, function(favicon) {
            log(tab.url, tab.title, favicon);
        });
    }
}

tabs.on("activate", function () { logTab(tabs.activeTab) });

tabs.on("pageshow", logTab );

windows.on("activate", function (window) {
    if (previous_window != window) {
        previous_window = window;
        return;
    }
    logTab(tabs.activeTab) ;
});

windows.on("deactivate", function (window) { log(null, null, null) });
