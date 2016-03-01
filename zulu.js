function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}

function walk(node) {
  var child, next;

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  textNode.nodeValue = textNode.nodeValue.replace(/(\d{4}Z)/gi, appendTimezone);
}

function appendTimezone(match) {
  var newTime = Number(match.replace("Z","").replace("z","")) + (timezoneOffset * 100);
  
  if(newTime > 2400) {newTime -= 2400};
  if(newTime < 0) {newTime += 2400};
  
  newTime = pad(newTime, 4);
  
  var newString = match.concat(" (", newTime, timezoneLabel, ")");
  return newString;
}

var timezoneLabel, timezoneOffset;

var d = new Date();
var offset = d.getTimezoneOffset();
timezoneOffset = (offset / 60)

chrome.runtime.sendMessage(
  "getTimezoneLabel", 
  function(response) {
    console.log("response.farewell: " + response.farewell);
    timezoneLabel = response.farewell;

    walk(document.body);
  }
);



