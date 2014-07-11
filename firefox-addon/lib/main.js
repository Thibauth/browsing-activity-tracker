var windows = require("sdk/windows").browserWindows;
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var prefs = require("sdk/simple-prefs").prefs;
var XMLHttpRequest = require("sdk/net/xhr").XMLHttpRequest;

function log(url, title){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", prefs.callbackUrl);
    var data = "url=" + encodeURIComponent(url);
    data += "&time=" + Date.now();
    data += "&title=" + encodeURIComponent(title);
    data += "&key=" + encodeURIComponent(prefs.key);
    xhr.send(data);
}

function logTab(tab) {
    if (tab.id === tabs.activeTab.id) {
        log(tab.url, tab.title);
    }
};

tabs.on("activate", function () { logTab(tabs.activeTab) });
tabs.on("pageshow", logTab );
windows.on("activate", function () { logTab(tabs.activeTab) });
windows.on("deactivate", function () { log(null, null) });
