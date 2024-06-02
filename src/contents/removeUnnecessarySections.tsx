import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import { CalendarSettingName } from "~src/options/components/moodle/courseCalendarOptions"

import SettingWatcher from "./generalSettingsWatcher"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const RemoveUnnecessarySectionsCS = () => {
  console.log("RemoveUnnecessarySectionsCS")
  // Remove website introduction
  const unnecessarySections = document.getElementById("inst2") as HTMLElement
  if (unnecessarySections) {
    unnecessarySections.remove()
  }
  //remove online lately
  const onlineLately = document.getElementById("inst31") as HTMLElement
  if (onlineLately) {
    onlineLately.remove()
  }

  const calendarContent = document
    .getElementById("inst3")
    .getElementsByClassName("card-text content mt-3")[0]

  // Remove footer
  const footer = calendarContent.getElementsByClassName(
    "footer"
  )[0] as HTMLElement
  if (footer) {
    footer.remove()
  }
}

SettingWatcher.get(CalendarSettingName).then((calendarEnabled) => {
  if (calendarEnabled === "true") {
    RemoveUnnecessarySectionsCS()
  }
})
