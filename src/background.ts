export {}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.insertCSS({
        target: { tabId: tabId },
        css: "body { visibility: hidden; }"
    }).catch(err => console.log(err))
})