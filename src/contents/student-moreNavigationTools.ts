import { get } from "http"
import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { StudentClickCountTrackingSettingName } from "~src/options/components/students-daa/clickCountTrackingOptions"

export const config: PlasmoCSConfig = {
  matches: [
    "https://student.uit.edu.vn/",
    "https://student.uit.edu.vn/user/login*",
    "https://student.uit.edu.vn/user/login%26homepage"
  ],
  all_frames: true
}
const cookieVarStorageName = "studentSiteCookie"
const storage = new Storage({
  area: "local"
})
//News things to add to the navigation
const additionalLinksToInject = [
  {
    link: "https://student.uit.edu.vn/sinhvien/kqhoctap",
    text: "Kết quả"
  },
  {
    link: "https://student.uit.edu.vn/sinhvien/tkb",
    text: "Thời khoá biểu"
  }
]

let allLinks = []
const injectNewNavigation = () => {
  const id = "block-system-user-menu"
  const container = document.getElementById(id)
  if (!container) return
  const menu = container.querySelector(".menu.nav")
  if (!menu) return
  additionalLinksToInject.forEach((link, index) => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = link.link
    a.innerText = link.text
    li.appendChild(a)
    menu.appendChild(li)
  })

  //Move logout to the bottom
  const logout = menu.querySelector("li.last")
  if (logout) {
    menu.appendChild(logout)
  }
}
//With newly injected links. Get all links from the navigation and push them to the allLinks array
async function initLinks() {
  const id = "block-system-user-menu"
  const container = document.getElementById(id)
  if (!container) return

  const menu = container.querySelector(".menu.nav")
  if (!menu) return

  const links = menu.querySelectorAll("a")

  const promises = []

  links.forEach(async (link) => {
    const linkName = link.href

    promises.push(
      storage.get(`clickCount-${linkName}`).then(async (clickCount) => {
        console.log("Link name and count", linkName, clickCount)

        if (!clickCount) {
          allLinks.push({ link: linkName, count: 0, text: link.innerText })
        } else {
          allLinks.push({
            link: linkName,
            count: clickCount,
            text: link.innerText
          })
        }
      })
    )
  })

  await Promise.all(promises)
}

//Assigning each link access counts. If storage value for this link is not found, assign 0. Format : clickCount-<link>
const assignClickCountEvent = async () => {
  const id = "block-system-user-menu"
  const container = document.getElementById(id)
  if (!container) return
  const menu = container.querySelector(".menu.nav")
  if (!menu) return
  const links = menu.querySelectorAll("a")
  links.forEach((link) => {
    if (link.href === "https://student.uit.edu.vn/user/logout") return
    link.addEventListener("click", async () => {
      console.log("Link clicked", link.href)
      const linkName = link.href

      await storage.get(`clickCount-${linkName}`).then(async (clickCount) => {
        console.log("Click count", clickCount)
        if (clickCount !== undefined) {
          await storage.set(`clickCount-${linkName}`, clickCount + 1)
        } else {
          await storage.set(`clickCount-${linkName}`, 1)
        }
      })
    })
    console.log("Link", link)
  })
  console.log("All links", allLinks[0])
}

//Sort based on click counts
const sortLinks = () => {
  //Remove .menu inside .content
  const id = "block-system-user-menu"
  const container = document.getElementById(id)
  if (!container) return
  const menu = container.querySelector(".menu.nav")
  if (!menu) return
  const logout = menu.querySelector("li.last")
  const contentBox = container.querySelector(".content")
  //Create a new using the sorted array
  const sortedLinks = allLinks.sort((a, b) => b.count - a.count)

  const newMenu = document.createElement("ul")
  newMenu.className = "menu nav"
  sortedLinks.forEach((link) => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = link.link
    a.innerText = link.text
    li.className = "leaf"
    li.appendChild(a)
    newMenu.appendChild(li)
  })

  contentBox.removeChild(menu)
  contentBox.appendChild(newMenu)
}

export async function clearClickCountOnNav() {
  //Get all from storage and clear those start with clickCount
  const keys = await storage.getAll()
  const clickCountKeys = Object.keys(keys).filter((key) =>
    key.includes("clickCount")
  )
  clickCountKeys.forEach(async (key) => {
    await storage.remove(key)
  })
}

storage.get(cookieVarStorageName).then(async (cookieVar: any) => {
  if (cookieVar) {
    console.log("Cookie found", cookieVar)
    const setting = await storage.get(StudentClickCountTrackingSettingName)
    if (setting === "false") {
      console.log("Click count tracking is disabled. Not tracking.")
      return
    }

    injectNewNavigation()
    await initLinks()
    sortLinks()
    assignClickCountEvent()
  } else {
    console.log("Cookie not found. Not logged in, no change to navigation.")
  }
})

storage.watch({
  [cookieVarStorageName]: (c) => {
    if (c.newValue) {
      console.log("Cookie changed", c.newValue)
    }
  }
})
