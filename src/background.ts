export {}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url === "https://courses.uit.edu.vn/") {
    chrome.scripting
      .insertCSS({
        target: { tabId: tabId },
        css: "body { visibility: hidden; }"
      })
      .catch((err) => console.log(err))
  }
})
