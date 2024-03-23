import { Storage } from "@plasmohq/storage"

const storage = new Storage({
  area: "local"
})

//Adjust color brightness by amount
function adjust(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}
//Convert rgb to hex
function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

//Store original color just in case
function storeOriginalColor() {
  const textColor = getComputedStyle(document.body).color
  const backgroundColor = getComputedStyle(document.body).backgroundColor
  const primaryColor = getComputedStyle(
    document.querySelector(".card")
  ).backgroundColor
  const accentColor = getComputedStyle(
    document.querySelector(".alert-info")
  ).backgroundColor
  const secondaryColor = getComputedStyle(
    document.querySelector(".btn-secondary")
  ).backgroundColor

  const originalPallette = {
    textColor,
    backgroundColor,
    primaryColor,
    accentColor,
    secondaryColor
  }

  storage.set("originalPallette", originalPallette)
  console.log("Original pallette stored: ", originalPallette)
}

export { adjust, componentToHex, rgbToHex, storeOriginalColor }
