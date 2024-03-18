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
          day: a.getAttribute("data-day"),
          month: a.getAttribute("data-month"),
          year: a.getAttribute("data-year")
        }
        deadlinesArr.push(addedDeadline)
      }
    }
   
    //render
    const targetElement = document.getElementById("inst3")
    const root = createRoot(targetElement)
    root.render(<ReplaceCalendar deadlines={deadlinesArr} />)

    //remove online lately
    const onlineLately = document.getElementById("inst31")
    onlineLately.remove()
  }, [])

  return null
}

export default ReplaceCalendarCS
