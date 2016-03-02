chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == "getTimezoneLabel") {
      var value = chrome.storage.sync.get("timezoneLabel", function(items) {
        if (!chrome.runtime.error) {
          sendResponse({farewell: items.timezoneLabel});
        } else {
          sendResponse({farewell: ""});
        }
        
      });
    }
    return true;
  }
);
