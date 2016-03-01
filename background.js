chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    console.log(request + ", " + sender + ", " + sendResponse);
    if (request == "getTimezoneLabel") {
      var value = chrome.storage.sync.get("timezoneLabel", function(items) {
        if (!chrome.runtime.error) {
          console.log("Sending response: " + items.timezoneLabel);
          sendResponse({farewell: items.timezoneLabel});
        } else {
          console.log("Sending response: " + items.timezoneLabel);
          sendResponse({farewell: ""});
        }
        
      });
    }
    return true;
  }
);