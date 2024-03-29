import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const searchBarStyle = `
    .modified-search-bar {
        border-radius: 10px;
      
        border: 1px solid #007bff;
        padding: 5px 10px;
        background-color: #f1f1f1;
        color: #333;
    }
    `
const searchBarClass = "modified-search-bar"

function changeSearchBarStyle() {
  const style = document.createElement("style")
  style.innerHTML = searchBarStyle
  document.head.appendChild(style)
  const searchBar = document.querySelector("#search")
  searchBar?.classList.add(searchBarClass)
}

changeSearchBarStyle()
