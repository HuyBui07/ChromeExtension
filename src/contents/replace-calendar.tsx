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
    const targetElement = document.getElementById("inst3")

    const root = createRoot(targetElement)
    root.render(<ReplaceCalendar deadlines={deadlinesArr} />)

    //remove online lately
    const onlineLately = document.getElementById("inst31")
    onlineLately.remove()
    
    //show the body after rendering
    document.body.style.visibility = "visible"
  }, [])

  return null
}

export default ReplaceCalendarCS
