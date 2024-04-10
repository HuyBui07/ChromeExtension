import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://student.uit.edu.vn/"],
  all_frames: true
}
const extractValue = (option: HTMLOptionElement) => option.value
const extractText = (option: HTMLOptionElement) => option.innerText
const selectBox = document.querySelector(".content div .links")
const options = selectBox?.querySelectorAll("option")
//Get from select box parent
const oldContainer = selectBox?.parentElement
console.log(oldContainer)
//Extract value from options

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
  //Create a bigger than old box that is easily selectable
  const container = document.createElement("div")
  container.classList.add("links-container")
  //Create a link
  const linkElement = document.createElement("a")

  linkElement.innerText = link.text.replace("--", "")
  linkElement.href = link.value
  linkElement.style.display = "block"
  linkElement.style.padding = "10px"

  container.appendChild(linkElement)
  return container
}

removeOldSelect()
injectLinks()