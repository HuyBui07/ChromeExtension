import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

//components
import CourseNote from "~src/components/CourseNote"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const CourseNotesCS = () => {
  useEffect(() => {
    const coursesDiv = document.getElementsByClassName(
      "frontpage-course-list-enrolled"
    )[0]

    // Get all course elements in the div
    const courseElements = Array.from(coursesDiv.children)
    console.log(courseElements[0])

    for (let courseElement of courseElements) {
      // Create a new div
      const courseNote = document.createElement("textarea")
      courseNote.placeholder = "Add a note..."
      courseNote.style.border = "1px solid #ccc"
      courseNote.style.borderRadius = "5px"
      courseNote.style.padding = "5px"

      const courseId = courseElement.getAttribute("data-courseid")

      // Load the note from storage
      const savedNote = localStorage.getItem(`courseNote-${courseId}`)
      if (savedNote) {
        courseNote.value = savedNote
      }

      // Save the note to storage when it changes
      courseNote.addEventListener("change", () => {
        localStorage.setItem(`courseNote-${courseId}`, courseNote.value)
      })

      // Append the new div to the course element
      courseElement.appendChild(courseNote)
    }
  })
}

export default CourseNotesCS
