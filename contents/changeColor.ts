import type { PlasmoCSConfig } from "plasmo"

import { relayMessage } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}
//TODO: refactor to use storage
//List of elements to change color. Same line means they have the same color. Also consider border color
//  card background-color, .block background-color, #region-main background-color, .navbar-bootswatch background-color, dropdown-menu background-color
// popover background-color (actual body bg), popover-header background-color, popover-body background-color
// calendar :
//  + today: .maincalendar .calendarmonth td.today .day-number-circle
//

//body background-color,
//TEXT COLOR: Same line means similar color
// body : originally black
// a : originally blue
// popover-body : originally black
// popover-header : originally white

//Border : #frontpage-available-course-list .coursebox, #frontpage-course-list .coursebox, .course-search-result .coursebox
//#frontpage-available-course-list .coursebox, #frontpage-course-list .coursebox, .course-search-result .coursebox
//
//Some buttons :  btn btn-secondary
const storage = new Storage({
  area: "local"
})

//Watch current pallete
storage.watch({
  currentPallette: (c) => {
    //Change body
    changeElementColor(c.newValue || "white")
  }
})
function changeElementColor(color: any) {
  changeTextColor(color.textColor)
  changeBodyColor(color.backgroundColor)
  changeDropdownColor(color.backgroundColor)
  changeCardColor(color.primaryColor)
  changeNavbarColor(color.primaryColor)
  changeAlertColor(color.accentColor)
  changeRegionMainColor(color.primaryColor)
  changeCalendarColor(adjust(color.primaryColor, 40))
  changeBtnColor(color.secondaryColor)
}

function changeDropdownColor(color: string) {
  const dropdown = document.querySelectorAll(".dropdown-menu")
  dropdown.forEach((d: HTMLElement) => {
    d.style.backgroundColor = color
  })
}

function changeTextColor(color: string) {
  const text = document.querySelectorAll("body")
  text.forEach((t: HTMLElement) => {
    t.style.color = color
  })
  const links = document.querySelectorAll("a")
  links.forEach((l: HTMLElement) => {
    l.style.color = color
  })
}
function changeBtnColor(color: string) {
  const btn = document.querySelectorAll(".btn-secondary")
  btn.forEach((b: HTMLElement) => {
    b.style.backgroundColor = color
    b.style.borderColor = adjust(color, -20)
  })
}

function changeCalendarColor(color: string) {
  const calendar = document.querySelectorAll(
    ".maincalendar .calendarmonth td.today .day-number-circle"
  )
  calendar.forEach((c: HTMLElement) => {
    c.style.backgroundColor = color
  })
}

function changeBodyColor(color: string) {
  const body = document.querySelector("body") as HTMLElement
  body.style.backgroundColor = color
}

function changeAlertColor(color: string) {
  const alert = document.querySelectorAll(".alert-info")
  alert.forEach((a: HTMLElement) => {
    a.style.backgroundColor = color
  })
  //Set text color to white
  const alertText = document.querySelectorAll(".alert-info")
  alertText.forEach((a: HTMLElement) => {
    a.style.color = "white"
  })
}

function changeNavbarColor(color: string) {
  const navbar = document.querySelector(".navbar-bootswatch") as HTMLElement
  navbar.style.backgroundColor = color
  //change border .navbar to a bit darker
  navbar.style.borderColor = color
  //darken color for border
  navbar.style.borderBottomColor = adjust(color, -20)
}

function changeCardColor(color: string) {
  const card = document.querySelectorAll(".card")
  card.forEach((c: HTMLElement) => {
    c.style.backgroundColor = color
  })
}
//Todo: change popover color upon hover
//Note: can not change color due to embedded javascript. Either replace with a new calendar with their own javascript or use a different method
function changePopoverColor(textColor: string, backgroundColor: string) {
  //Modify class popover
  const popover = document.querySelectorAll(".popover")
  popover.forEach((p: HTMLElement) => {
    p.style.backgroundColor = backgroundColor
  })
}

function changeRegionMainColor(color: string) {
  const regionMainBox = document.querySelector(
    ".region-main-content"
  ) as HTMLElement
  regionMainBox.style.backgroundColor = color
}

function adjust(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}
