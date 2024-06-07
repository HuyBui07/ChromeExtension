import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect } from "react"

import { CalendarSettingName } from "~src/options/components/moodle/courseCalendarOptions"

import SettingWatcher from "./generalSettingsWatcher"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/mod/assign/view.php*"],
  all_frames: true
}

const ReplaceCalendarSupporterCS = () => {
  const submitButton = document.querySelector('[data-fieldtype="submit"]')

  if (submitButton) {
    submitButton.addEventListener("click", function () {
      console.log("submit button clicked")
      let unsubmittedDeadlines = JSON.parse(
        localStorage.getItem("unsubmittedDeadlines") || "[]"
      )
      console.log(unsubmittedDeadlines)

      const href = document
        .getElementsByClassName("tree_item hasicon active_tree_node")[0]
        .getElementsByTagName("a")[0]
        .getAttribute("href")

      console.log(href)

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
}

SettingWatcher.get(CalendarSettingName).then((calendarEnabled) => {
  if (calendarEnabled === "true") {
    ReplaceCalendarSupporterCS()
  }
})
