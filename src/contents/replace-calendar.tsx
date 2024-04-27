import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"

import ReplaceCalendar from "~src/components/ReplaceCalendar"

//types
import type { Deadline } from "../types"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const ReplaceCalendarCS = () => {
  useEffect(() => {
    //change headline
    const headline = document.getElementById("instance-3-header")
    const newHeadline = document.createElement("h5")
    newHeadline.innerHTML = "Deadlines"
    headline.replaceWith(newHeadline)

    const userbutton = document.getElementsByClassName(
      "userbutton"
    )[0] as HTMLElement
    userbutton.style.display = "flex"
    userbutton.style.alignItems = "center"

    const ChangeCalendar = async () => {
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
            if (
              submittedDeadlines.includes(eventHref[j].getAttribute("href"))
            ) {
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

      //replace old calendar with new deadline list
      const targetElement = document.querySelectorAll(
        ".calendarmonth, .calendartable, .mb-0"
      )[0]

      const root = createRoot(targetElement)
      root.render(<ReplaceCalendar deadlines={deadlinesArr} />)
    }

    ChangeCalendar()

    //observer to check if the calendar is changed, if changed, call ChangeCalendar
    const observer = new MutationObserver(() => {
      if (
        document
          .querySelectorAll(".calendarmonth, .calendartable, .mb-0")[0]
          .getElementsByTagName("thead").length > 0
      ) {
        ChangeCalendar()
      }
    })

    const maincalendar = document.getElementsByClassName("maincalendar")[0]

    observer.observe(maincalendar, {
      attributes: true,
      childList: false,
      subtree: true
    })

    //remove online lately
    const onlineLately = document.getElementById("inst31")
    onlineLately.remove()

    //show the body after rendering
    document.body.style.visibility = "visible"

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

const ScanForSubmittedState = async (href: string) => {
  return await fetch(href).then(async (response) => {
    const data = await response.text()
    if (data.includes("submissionstatussubmitted")) return true
    return false
  })
}

export default ReplaceCalendarCS

