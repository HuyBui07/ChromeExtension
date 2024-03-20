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

    const ChangeCalendar = () => {
      //get data
      const deadlines = document.getElementsByTagName("td")
      const deadlinesArr = []
      for (let i = 0; i < deadlines.length; i++) {
        const deadline = deadlines[i]
        if (deadline.className.includes("hasevent")) {
          const a = deadline.getElementsByTagName("a")[0]
          const addedDeadline: Deadline = {
            day: parseInt(a.getAttribute("data-day")),
            month: parseInt(a.getAttribute("data-month")),
            year: parseInt(a.getAttribute("data-year")),
            timestamp: parseInt(a.getAttribute("data-timestamp"))
          }
          deadlinesArr.push(addedDeadline)
        }
      }
      console.log(deadlinesArr)

      //render
      const targetElement = document.querySelectorAll(
        ".calendarmonth, .calendartable, .mb-0"
      )[0]

      const root = createRoot(targetElement)
      root.render(<ReplaceCalendar deadlines={deadlinesArr} />)
    }

    ChangeCalendar()

    const observer = new MutationObserver(() => {
      ChangeCalendar()
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
  }, [])

  return null
}

export default ReplaceCalendarCS
