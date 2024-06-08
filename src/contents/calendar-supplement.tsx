import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import DateDetails from "~src/components/DateDetails"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

// Add the deadline details when a day is selected below the calendar
const CalendarDetails = async () => {
  const calendarContent = document
    .getElementById("inst3")
    .getElementsByClassName("card-text content mt-3")[0]

  // Add a listener for each td element
  let prevDate = null
  const deadlineList = []
  const dates = calendarContent.getElementsByTagName("td")
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]

    // This listerner is to prevent the popover appear when the date is clicked
    date.addEventListener("focusin", function (event) {
      event.preventDefault()
      event.stopPropagation()

      const popover = document.getElementsByClassName(
        "popover bs-popover-top fade show"
      )[0] as HTMLElement
      if (popover) popover.style.display = "none"
    })

    //This listener is to allow the popover to appear when hovering over a date, but not when the date is clicked
    date.addEventListener("focusout", function (event) {
      event.preventDefault()
      event.stopPropagation()

      const popover = document.getElementsByClassName(
        "popover bs-popover-top fade show"
      )[0] as HTMLElement
      if (popover) popover.style.display = "block"
    })

    // This listener is to get the event details when a date is clicked
    date.addEventListener("click", function (event) {
      event.preventDefault()
      event.stopPropagation()

      // Get the event details
      deadlineList.length = 0
      const eventName = date.getElementsByClassName("eventname")
      const eventHref = date.querySelectorAll('[data-action="view-event"]')
      for (let j = 0; j < eventName.length; j++) {
        deadlineList.push({
          href: eventHref[j].getAttribute("href"),
          content: eventName[j].innerHTML
        })
      }

      // Highlight the clicked date
      if (prevDate) {
        prevDate
          .getElementsByClassName("day-number-circle")[0]
          .classList.remove("clicked")
      }

      const dayNumberCircle = date.getElementsByClassName(
        "day-number-circle"
      )[0] as HTMLElement
      dayNumberCircle.classList.add("clicked")

      prevDate = date

      ReactDOM.render(
        <DateDetails deadlines={deadlineList} />,
        document.getElementById("date-details")
      )
    })
  }

  console.log("i run")
}

// Add the date details section below the calendar, the reason to split
// the calendar supplement into two parts is to prevent the observer from being called multiple times,
// causing the <hr> element to be added multiple times.
const CalendarSupplementCS = async () => {
  const calendarContent = document
    .getElementById("inst3")
    .getElementsByClassName("card-text content mt-3")[0]

  // Add date details section
  calendarContent.insertAdjacentHTML(
    "beforeend",
    '<hr style="border: 1px solid #d3d3d3">'
  )

  const dateDetails = document.createElement("div")
  dateDetails.id = "date-details"
  dateDetails.style.display = "flex"
  dateDetails.style.direction = "row"
  calendarContent.appendChild(dateDetails)

  await CalendarDetails()

  const today = document.getElementsByClassName("today")[0] as HTMLElement
  today.click()

  
}

CalendarSupplementCS()

// This function is to filter out the unnecessary mutations because the observer
// will be called multiple times when the calendar is changed
const mutationFilter = (mutation: MutationRecord) => {
  const target = mutation.target as HTMLElement;
  if (
    (mutation.type === "attributes" && mutation.attributeName === "aria-describedby") ||
    (mutation.type === "attributes" && mutation.attributeName === "data-original-title") ||
    (mutation.type === "attributes" && mutation.attributeName === "title") ||
    (mutation.type === "attributes" && mutation.attributeName === "class" && target.classList.contains("day-number-circle"))
  ) {
    return false;
  }

  return true
}

// Observer to check if the calendar is changed, if changed, call ChangeCalendar, which
// will call CalendarDetails to add the deadline details
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutationFilter(mutation)) {
      CalendarDetails()
    }
  }
})

const maincalendar = document.getElementsByClassName("maincalendar")[0]

observer.observe(maincalendar, {
  attributes: true,
  childList: false,
  subtree: true
})
