import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/mod/assign/view.php*"],
  all_frames: true
}

const ReplaceCalendarSupporterCS = () => {
  useEffect(() => {
    const submitButton = document.querySelector('[data-fieldtype="submit"]')

    if (submitButton) {
      submitButton.addEventListener("click", function () {
        let unsubmittedDeadlines = JSON.parse(
          localStorage.getItem("unsubmittedDeadlines") || "[]"
        )
        console.log(unsubmittedDeadlines)

        const href = document
          .getElementsByClassName("tree_item hasicon active_tree_node")[0]
          .getElementsByTagName("img")[0]
          .getAttribute("src")

        if (unsubmittedDeadlines.includes(href)) {
          unsubmittedDeadlines = unsubmittedDeadlines.filter(
            (item: string) => item !== href
          ) 
        }

        localStorage.setItem(
          "unsubmittedDeadlines",
          JSON.stringify(unsubmittedDeadlines)
        )
      })
    }
  }, [])
}

export default ReplaceCalendarSupporterCS
