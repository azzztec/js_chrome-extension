chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": 'wordsStat',
    "title": 'Words Stat',
    "contexts": ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener(function(menuInfo) {
  let selectedText = menuInfo.selectionText

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {selectedText});
  });
})