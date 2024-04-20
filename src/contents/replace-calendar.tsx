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
      //get data
      const deadlines = document.getElementsByTagName("td")
      const deadlinesArr = []
      const submittedDeadlines = JSON.parse(
        localStorage.getItem("submittedDeadlines") || "[]"
      )
      for (let i = 0; i < deadlines.length; i++) {
        const deadline = deadlines[i]
        if (deadline.className.includes("hasevent")) {
          const a = deadline.getElementsByTagName("a")[0]
          const eventName = deadline.getElementsByClassName("eventname")
          const eventHref = deadline.querySelectorAll(
            '[data-action="view-event"]'
          )
          const eventList = []
          for (let j = 0; j < eventName.length; j++) {
            let submittedState = false
            if (
              submittedDeadlines.includes(eventHref[j].getAttribute("href"))
            ) {
              submittedState = true
            } else {
              submittedState = await ScanForSubmittedState(
                eventHref[j].getAttribute("href")
              )
              if (submittedState) {
                submittedDeadlines.push(eventHref[j].getAttribute("href"))
              }
            }
            eventList.push({
              href: eventHref[j].getAttribute("href"),
              content: eventName[j].innerHTML,
              submitted: submittedState
            })
          }
          const addedDeadline: Deadline = {
            day: parseInt(a.getAttribute("data-day")),
            month: parseInt(a.getAttribute("data-month")),
            year: parseInt(a.getAttribute("data-year")),
            timestamp: parseInt(a.getAttribute("data-timestamp")),
            eventList: eventList
          }
          deadlinesArr.push(addedDeadline)
        }
      }

      localStorage.setItem(
        "submittedDeadlines",
        JSON.stringify(submittedDeadlines)
      )
      //render
      const targetElement = document.querySelectorAll(
        ".calendarmonth, .calendartable, .mb-0"
      )[0]

      const root = createRoot(targetElement)
      root.render(<ReplaceCalendar deadlines={deadlinesArr} />)
    }

    ChangeCalendar()

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
