function save_options() {
  var label = document.getElementById('timezoneLabel').value;
  chrome.storage.sync.set({
    timezoneLabel: label
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  //Default values
  chrome.storage.sync.get({
  timezoneLabel: ""
  }, function(items) {
    document.getElementById('timezoneLabel').value = items.timezoneLabel;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);