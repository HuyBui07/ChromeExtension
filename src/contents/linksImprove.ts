import type { PlasmoCSConfig } from "plasmo"

import { StudentImproveLinksSettingsName } from "./../options/components/students-daa/studentImproveLinkSetting"
import SettingWatcher from "./generalSettingsWatcher"

export const config: PlasmoCSConfig = {
  matches: [
    "https://student.uit.edu.vn/",
    "https://student.uit.edu.vn/user/login%26homepage"
  ],
  all_frames: true
}

const extractValue = (option: HTMLOptionElement) => option.value
const extractText = (option: HTMLOptionElement) => option.innerText

const selectBox = document.querySelector(".content div .links")
const options = selectBox?.querySelectorAll("option")
const oldContainer = selectBox?.parentElement

const links = Array.from(options || []).map((option) => ({
  text: extractText(option),
  value: extractValue(option)
}))

function removeOldSelect() {
  const select = document.querySelector(".content div select")
  select?.remove()
}

function injectLinks() {
  const container = document.createElement("div")
  container.classList.add("links-container")
  links.forEach((link) => {
    if (!link.text || link.value === "#") return

    container.appendChild(linkComponent(link))
  })
  oldContainer?.appendChild(container)
}

function linkComponent(link: { text: string; value: string }) {
  const container = document.createElement("div")
  container.classList.add("link-container")
  const linkElement = document.createElement("a")

  linkElement.innerText = `${link.text.replace("--", "")}`
  linkElement.href = link.value
  linkElement.style.padding = "10px"

  container.appendChild(linkElement)
  return container
}

function injectLinkStyle() {
  const style = document.createElement("style")
  style.innerHTML = `
    .links-container {
      display: flex;
      flex-direction: column;
    }
    .link-container a {
      text-decoration: none;
      color: #0056e0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }
    .link-container a:hover {
      background-color: #f0f0f0;
    }
    `
  document.head.appendChild(style)
}

SettingWatcher.get(StudentImproveLinksSettingsName).then((settings) => {
  if (settings === "true") {
    injectLinkStyle()
    removeOldSelect()
    injectLinks()
  }
})
