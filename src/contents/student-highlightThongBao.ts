import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://student.uit.edu.vn/"],
  all_frames: true
}
function getElementDate(element: HTMLElement) {
  const date = element.innerText.split("-")[1].trim()
  return date
}
function areDateEqual(date1: string, date2: string) {
  const [day1, month1, year1] = date1.split("/").map(Number)
  const [day2, month2, year2] = date2.split("/").map(Number)
  console.log("Date 1: ", day1, month1, year1)
  console.log("Date 2: ", day2, month2, year2)
  const dateObj1 = new Date(year1, month1 - 1, day1) // 0-indexed in Date object
  const dateObj2 = new Date(year2, month2 - 1, day2)
  return dateObj1.getTime() === dateObj2.getTime()
}
const highlightDayOff = () => {
  //Select #block-views-thongbao-baonghi-baobu-block content div view-content item-list ul li
  const list = document.querySelectorAll(
    "#block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li"
  )
  //Highlight background color
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  //DD/MM/YYYY
  console.log("Today in DD/MM/YYYY: |", today.toLocaleDateString("en-GB"), "|")

  console.log("First element: ", list[0])
  console.log(
    'First element date: "',
    getElementDate(list[0] as HTMLElement),
    '"'
  )

  list.forEach((element) => {
    const date = getElementDate(element as HTMLElement)
    if (areDateEqual(date, today.toLocaleDateString("en-GB"))) {
      element.classList.add("highlight-today")
      const text = document.createElement("span")
      text.innerText = " - Hôm nay"
      text.style.color = "red"
      element.appendChild(text)
    } else if (areDateEqual(date, tomorrow.toLocaleDateString("en-GB"))) {
      element.classList.add("highlight-tomorrow")
      //Add some more text as
      const text = document.createElement("span")
      text.innerText = "- Ngày mai"
      text.style.color = "yellow"
    }
  })
  injectCss()
}

const injectCss = () => {
  const style = document.createElement("style")
  style.innerHTML = `
   #block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li.highlight-today {
    background-color: #ffcccc;
  }
  #block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li.highlight-tomorrow {
    background-color: #ffffcc;
  }
  `
  document.head.appendChild(style)
  console.log("Injected CSS")
}

highlightDayOff()
