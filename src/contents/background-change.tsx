import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const BackgroundChange = async () => {
  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     if (request.message === "draculaTheme") {
  ColorChange()
  //     }
  //   })
}

const ColorChange = () => {
  document.body.style.backgroundColor = "#282a36"

  let regionMain = document.getElementById("region-main") as HTMLElement
  regionMain.style.backgroundColor = "#282a36"
  regionMain.style.color = "#f8f8f2"
  regionMain.style.border = "1px solid #44475a"

  let courseNames = document.getElementsByClassName(
    "coursename"
  ) as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < courseNames.length; i++) {
    courseNames[i].style.color = "#f8f8f2"
  }

  let pageHeaderHeading = document.getElementsByClassName(
    "page-header-headings"
  )[0] as HTMLElement
  let cardBodyElements = document.getElementsByClassName(
    "card-body"
  ) as HTMLCollectionOf<HTMLElement>
  let cardTitleElements = document.getElementsByClassName(
    "card-title"
  ) as HTMLCollectionOf<HTMLElement>
  pageHeaderHeading.style.color = "#f8f8f2"
  for (let i = 0; i < cardBodyElements.length; i++) {
    cardBodyElements[i].style.backgroundColor = "#44475a"
  }
  for (let i = 0; i < cardTitleElements.length; i++) {
    cardTitleElements[i].style.color = "#bd93f9"
  }
}

export default BackgroundChange
