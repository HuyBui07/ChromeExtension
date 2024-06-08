import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect } from "react"
//components
import ReactDOM from "react-dom"

import UpcomingSection from "~src/components/UpcomingSection"
import { CalendarSettingName } from "~src/options/components/moodle/courseCalendarOptions"

//types
import SettingWatcher from "./generalSettingsWatcher"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const ReplaceCalendarCS = async () => {
  //change headline
  const headline = document.getElementById("instance-3-header")
  const newHeadline = document.createElement("h5")
  newHeadline.innerHTML = "Calendar"
  headline.replaceWith(newHeadline)

  const userbutton = document.getElementsByClassName(
    "userbutton"
  )[0] as HTMLElement
  userbutton.style.display = "flex"
  userbutton.style.alignItems = "center"

  async function ChangeCalendar() {
    //get the deadlines from the calendar
    const dates = document.getElementsByTagName("td")
    let deadlinesArr = []

    //get the submitted and unsubmitted deadlines from the local storage
    const submittedDeadlines = JSON.parse(
      localStorage.getItem("submittedDeadlines") || "[]"
    )
    const unsubmittedDeadlines = JSON.parse(
      localStorage.getItem("unsubmittedDeadlines") || "[]"
    )
    // const courseNameList = JSON.parse(
    //   localStorage.getItem("courseNameList") || "{}"
    // )

    //the check if a date have an event and check for its submitted state
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i]
      if (date.className.includes("hasevent")) {
        const a = date.getElementsByTagName("a")[0]
        const eventName = date.getElementsByClassName("eventname")
        const eventHref = date.querySelectorAll('[data-action="view-event"]')
        const deadlineList = []
        for (let j = 0; j < eventName.length; j++) {
          //check if the deadline is submitted or not
          let submittedState = false
          if (submittedDeadlines.includes(eventHref[j].getAttribute("href"))) {
            submittedState = true
          } else if (
            unsubmittedDeadlines.includes(eventHref[j].getAttribute("href"))
          ) {
            submittedState = false
          } else {
            submittedState = await ScanForSubmittedState(
              eventHref[j].getAttribute("href")
            )
            if (submittedState) {
              submittedDeadlines.push(eventHref[j].getAttribute("href"))
            } else {
              unsubmittedDeadlines.push(eventHref[j].getAttribute("href"))
            }
          }
          deadlineList.push({
            day: parseInt(a.getAttribute("data-day")),
            month: parseInt(a.getAttribute("data-month")),
            year: parseInt(a.getAttribute("data-year")),
            timestamp: parseInt(a.getAttribute("data-timestamp")),
            href: eventHref[j].getAttribute("href"),
            content: eventName[j].innerHTML,
            submitted: submittedState
          })

          // //get the course name
          // const courseName = await ScanForCourseName(
          //   eventHref[j].getAttribute("href")
          // )
          // courseNameList[eventHref[j].getAttribute("href")] = courseName
        }

        deadlinesArr = deadlinesArr.concat(deadlineList)
      }
    }

    localStorage.setItem(
      "submittedDeadlines",
      JSON.stringify(submittedDeadlines)
    )
    localStorage.setItem(
      "unsubmittedDeadlines",
      JSON.stringify(unsubmittedDeadlines)
    )

    // localStorage.setItem("courseNameList", JSON.stringify(courseNameList))

    // Add upcoming section
    const existingUpcomingSection = document.getElementById("upcoming-section")
    if (existingUpcomingSection) {
      existingUpcomingSection.remove()
    }
    const upcomingSection = document.createElement("div")
    upcomingSection.id = "upcoming-section"
    upcomingSection.className = "upcoming-section"
    ReactDOM.render(
      <UpcomingSection deadlines={deadlinesArr} />,
      upcomingSection
    )
    const calendarSection = document.getElementById("inst3")
    calendarSection.parentNode.insertBefore(upcomingSection, calendarSection)
  }

  await ChangeCalendar()

  //observer to check if the calendar is changed, if changed, call ChangeCalendar
  const observer = new MutationObserver(ChangeCalendar)

  const maincalendar = document.getElementsByClassName("maincalendar")[0]

  observer.observe(maincalendar, {
    attributes: true,
    childList: false,
    subtree: true
  })

  //show the body after rendering
  document.body.style.visibility = "visible"

  return () => {
    observer.disconnect()
  }
}

const ScanForSubmittedState = async (href: string) => {
  return await fetch(href).then(async (response) => {
    const data = await response.text()
    if (data.includes("submissionstatussubmitted")) return true
    return false
  })
}

// const ScanForCourseName = async (href: string) => {
//   return await fetch(href).then(async (response) => {
//     const data = await response.text()
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(data, "text/html")
//     const courseName = doc
//       .getElementsByClassName("page-header-headings")[0]
//       .getElementsByTagName("h1")[0].innerHTML
//     return courseName
//   })
// }

SettingWatcher.get(CalendarSettingName).then((calendarEnabled: any) => {
  console.log("Initial calendar setting: ", calendarEnabled)
  if (calendarEnabled === "true") {
    ReplaceCalendarCS()
  } else {
    document.body.style.visibility = "visible"
  }
})
