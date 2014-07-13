var prefs = {};

chrome.storage.local.get({callback: 'http://localhost:8080', key: 'chrome'}, function(o) { prefs = o; });

chrome.storage.onChanged.addListener(function(changes) {
    for (key in changes) {
        prefs[key] = changes[key].newValue;
    }
});

function log(url, title){
    var data = JSON.stringify({
        url: url, time: Date.now(),
        title: title, key: prefs.key
    });
    var xhr = new XMLHttpRequest();
    xhr.open("POST", prefs.callback);
    xhr.send(data);
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (tab.status === "complete") {
            log(tab.url, tab.title);
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.active) {
        log(tab.url, tab.title);
    }
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
    if (windowId == chrome.windows.WINDOW_ID_NONE) {
        log(null, null);
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs[0].status === "complete") {
                log(tabs[0].url, tabs[0].title);
            }
        });
    }
});


