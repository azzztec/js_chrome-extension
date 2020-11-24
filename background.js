import { MOST_POPULAR_WORDS } from './config.js'

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": 'wordsStat',
    "title": 'Words Stat',
    "contexts": ["selection"]
  })
  chrome.storage.sync.set({'mostPopularWords': MOST_POPULAR_WORDS});
})

chrome.contextMenus.onClicked.addListener(function(menuInfo) {
  let selectedText = menuInfo.selectionText

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {selectedText});
  });
})