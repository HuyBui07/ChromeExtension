import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const RemoveUnnecessarySectionsCS = () => {
  // Remove website introduction
  const unnecessarySections = document.getElementById("inst2")
  unnecessarySections.remove()

  //remove online lately
  const onlineLately = document.getElementById("inst31")
  onlineLately.remove()

  const calendarContent = document
    .getElementById("inst3")
    .getElementsByClassName("card-text content mt-3")[0]

  // Remove footer
  const footer = calendarContent.getElementsByClassName("footer")[0]
  footer.remove()
}

RemoveUnnecessarySectionsCS()
