import { adjust } from "./utils"

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

//Drop down on user menu top right
function changeDropdownColor(color: string) {
  const dropdown = document.querySelectorAll(".dropdown-menu")
  dropdown.forEach((d: HTMLElement) => {
    d.style.backgroundColor = color
  })
}

//General text and links
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

// "Tat ca khoa hoc" button

function changeBtnColor(color: string) {
  const btn = document.querySelectorAll(".btn-secondary")
  btn.forEach((b: HTMLElement) => {
    b.style.backgroundColor = color
    b.style.borderColor = adjust(color, -20)
  })
}

//Change only the highlight of "Hom nay"
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

//Notifications at the start of course list
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
//Card = any block in the page
function changeCardColor(color: string) {
  const card = document.querySelectorAll(".card")
  card.forEach((c: HTMLElement) => {
    c.style.backgroundColor = color
  })
}

//Courses list region
function changeRegionMainColor(color: string) {
  const regionMainBox = document.querySelector(
    ".region-main-content"
  ) as HTMLElement
  regionMainBox.style.backgroundColor = color
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

export { changeElementColor }
