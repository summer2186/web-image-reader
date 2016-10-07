// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  var tabId = tab.id;
  chrome.tabs.executeScript(tabId, {file: "main.js"}, function(){});
});
