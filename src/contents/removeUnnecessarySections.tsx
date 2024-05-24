import type { PlasmoCSConfig } from "plasmo"

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

}

RemoveUnnecessarySectionsCS()
