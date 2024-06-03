import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import DateDetails from "~src/components/DateDetails"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

// Add details below the calendar
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

    date.addEventListener("focusin", function (event) {
      event.preventDefault()
      event.stopPropagation()

      const popover = document.getElementsByClassName(
        "popover bs-popover-top fade show"
      )[0] as HTMLElement
      popover.style.display = "none"
    })

    date.addEventListener("focusout", function (event) {
      event.preventDefault()
      event.stopPropagation()

      const popover = document.getElementsByClassName(
        "popover bs-popover-top fade show"
      )[0] as HTMLElement
      popover.style.display = "block"
    })

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
}

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

  CalendarDetails()
}

CalendarSupplementCS()

//observer to check if the calendar is changed, if changed, call ChangeCalendar
const observer = new MutationObserver(CalendarDetails)

const maincalendar = document.getElementsByClassName("maincalendar")[0]

observer.observe(maincalendar, {
  attributes: true,
  childList: false,
  subtree: true
})
