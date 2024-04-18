import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: [
    "https://student.uit.edu.vn/",
    "https://student.uit.edu.vn/user/login%26homepage/"
  ],
  all_frames: true
}

const injectNewNavigation = () => {
  const id = "block-system-user-menu"
  const linkToInject = [
    "https://student.uit.edu.vn/sinhvien/kqhoctap",
    "https://student.uit.edu.vn/sinhvien/tkb"
  ]
  const linkText = ["Kết quả học tập", "Thời khoá biểu"]
  const container = document.getElementById(id)
  if (!container) return
  const menu = container.querySelector(".menu.nav")
  if (!menu) return
  linkToInject.forEach((link, index) => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = link
    a.innerText = linkText[index]
    li.appendChild(a)
    menu.appendChild(li)
  })

  //Move logout to the bottom
  const logout = menu.querySelector("li.last")
  if (logout) {
    menu.appendChild(logout)
  }
}
const cookieVarStorageName = "studentSiteCookie"
const storage = new Storage({
  area: "local"
})
storage.get(cookieVarStorageName).then((cookieVar: any) => {
  if (cookieVar) {
    console.log("Cookie found", cookieVar)
    injectNewNavigation()
  } else {
    console.log("Cookie not found")
  }
})

storage.watch({
  [cookieVarStorageName]: (c) => {
    if (c.newValue) {
      console.log("Cookie changed", c.newValue)
    }
  }
})
