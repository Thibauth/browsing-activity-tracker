function save() {
    var data = {};
    data[this.id] = this.value;
    chrome.storage.local.set(data);
}

function restore_options() {
    chrome.storage.local.get({
        callback: 'http://localhost:8080',
        key: 'chrome'
    }, function(options) {
        document.getElementById('callback').value = options.callback;
        document.getElementById('key').value = options.key;
    });
}

document.getElementById('callback').addEventListener('change', save);
document.getElementById('key').addEventListener('change', save);
document.addEventListener('DOMContentLoaded', restore_options);
