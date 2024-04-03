import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}
// courses frontpage-course-list-enrolled
const courseList = document.getElementsByClassName(
  "frontpage-course-list-enrolled"
)[0]
function normalizeVietnamese(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s.]/g, "")
    .replace(/\./g, " ")
}
const CourseFastSearchBar = () => {
  const searchBar = document.getElementsByClassName("simplesearchform")[0]
  const input = document.createElement("input")
  input.type = "text"
  input.placeholder = "Tìm kiếm"
  input.className = "modified-search-bar"

  searchBar.replaceWith(input)

  input.addEventListener("input", () => {
    const baseValue = input.value
    const value = input.value.toLowerCase()
    const courseBoxes = courseList.getElementsByClassName("coursebox")
    for (let i = 0; i < courseBoxes.length; i++) {
      const courseBox = courseBoxes[i] as HTMLElement
      const baseCoursename = courseBox
        .getElementsByClassName("coursename")[0]
        .getElementsByTagName("a")[0].innerText
      const courseName = normalizeVietnamese(baseCoursename)
      if (courseName.includes(value) || baseCoursename.includes(baseValue)) {
        courseBox.style.display = "flex"
      } else {
        courseBox.style.display = "none"
      }
    }
  })
}

CourseFastSearchBar()
