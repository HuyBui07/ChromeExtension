import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const storage = new Storage()
const searchBarClass = "modified-search-bar"
let searchBarStyle = ""
function changeSearchBarStyle() {
  console.log("Change search bar style")
  const style = document.createElement("style")
  style.innerHTML = searchBarStyle
  document.head.appendChild(style)
}
function generateStyle() {
  const primaryColor = storage.get("currentPalette")
  searchBarStyle = primaryColor
    ? `
    .modified-search-bar {
        border-radius: 10px; 
        border: 1px solid ${primaryColor};
        padding: 5px 10px;
        background-color: #f1f1f1;
        color: #333;
    }
    `
    : `
    .modified-search-bar {
        border-radius: 10px;
        border: 1px solid #007bff;
        padding: 5px 10px;
        background-color: #f1f1f1;
        color: #333;
    }
    `
}

generateStyle()
changeSearchBarStyle()
