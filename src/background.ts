import { Storage } from "@plasmohq/storage"

export {}

const storage = new Storage({
  area: "local"
})

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
const storeStudentSiteCookie = () => {
  const cookieName = "SSESSdf6f777d3f8a1d0fb2e4e5d1ec62f6e2"
  const storageCookieName = "studentSiteCookie"
  const cookie = chrome.cookies.get(
    {
      url: "https://student.uit.edu.vn/",
      name: cookieName
    },
    (cookie) => {
      console.log("cookie", cookie)
      if (cookie) {
        console.log("cookie student.site found")
        storage.set(storageCookieName, cookie)
      } else {
        console.log("cookie student.site not found")
        storage.set(storageCookieName, null)
      }
    }
  )
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url === "https://student.uit.edu.vn/" ||
    RegExp("https://student.uit.edu.vn/user/login*").test(tab.url)
  ) {
    storeStudentSiteCookie()
  }
})
