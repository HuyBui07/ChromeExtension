import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://student.uit.edu.vn/"],
  all_frames: true
}
const highlightDayOff = () => {
  //Select the big block list
  const list = document.querySelectorAll(
    "#block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li"
  )

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  list.forEach((element) => {
    const date = getElementDate(element as HTMLElement)
    if (areDateEqual(date, today.toLocaleDateString("en-GB"))) {
      element.classList.add("highlight-today")
      //Declarative text
      const text = document.createElement("span")
      text.innerText = " - Hôm nay"
      text.classList.add("declarative-text")
      text.classList.add("danger")
      element.appendChild(text)
    } else if (areDateEqual(date, tomorrow.toLocaleDateString("en-GB"))) {
      element.classList.add("highlight-tomorrow")
      //Declarative text
      const text = document.createElement("span")
      text.innerText = "- Ngày mai"
      text.classList.add("declarative-text")
      text.classList.add("warning")
    }
  })
  injectCss()
}
//Get the date from the element
function getElementDate(element: HTMLElement) {
  const date = element.innerText.split("-")[1].trim()
  return date
}
//String as date comparison utility
function areDateEqual(date1: string, date2: string) {
  const [day1, month1, year1] = date1.split("/").map(Number)
  const [day2, month2, year2] = date2.split("/").map(Number)
  console.log("Date 1: ", day1, month1, year1)
  console.log("Date 2: ", day2, month2, year2)
  const dateObj1 = new Date(year1, month1 - 1, day1) // 0-indexed in Date object
  const dateObj2 = new Date(year2, month2 - 1, day2)
  return dateObj1.getTime() === dateObj2.getTime()
}

//Modular function to inject CSS. Modify this function to change the style
const injectCss = () => {
  const style = document.createElement("style")
  style.innerHTML = `
   #block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li.highlight-today {
    background-color: #ffcccc;
  }
  #block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li.highlight-tomorrow {
    background-color: #ffffcc;
  }
  #block-views-thongbao-baonghi-baobu-block .view-content .item-list ul li .declarative-text {
   
    font-weight: bold;
    margin-left: 5px;
  }
  span.danger {
    color: red;
  }
  span.warning {
    color: orange;
  }
  `
  document.head.appendChild(style)
}

highlightDayOff()
