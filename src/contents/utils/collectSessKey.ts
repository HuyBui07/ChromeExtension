import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

function collectSessionKey() {
  const html = document.documentElement.innerHTML
  const sesskeyRegex = /"sesskey":"([^"]+)"/
  const match = html.match(sesskeyRegex)
  if (match) {
    console.log("Found sesskey: ", match[1])
    const sesskey = match[1]
    const storage = new Storage({ area: "local" })
    storage.set("sesskey", sesskey)
  } else {
    console.log("No sesskey found")
  }
}

collectSessionKey()
