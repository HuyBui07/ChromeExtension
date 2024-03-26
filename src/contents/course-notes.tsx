import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

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

      const buttonDiv = document.createElement("div")

      // Append the new div to the course element
      if (!courseElement.classList.contains("paging"))
        courseElement.appendChild(buttonDiv)

      ReactDOM.render(<OpenNotesButton courseId={courseId} />, buttonDiv)
    }
  })
}

const OpenNotesButton = ({ courseId }) => {
  const [value, setValue] = useState(
    localStorage.getItem(`courseNote-${courseId}`) || ""
  )

  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          ).showModal()
        }>
        Open notes
      </button>
      <dialog id="my_modal_1" className="w-[50%] p-5 rounded-md">
        <textarea
          placeholder="Add a note..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            localStorage.setItem(`courseNote-${courseId}`, e.target.value)
          }}
          className="w-full h-[200px] border border-gray-300 rounded p-2"
        />
        <div className="flex flex-row w-full">
          <button
            className="ml-auto border-2 border-gray-300 rounded-md p-2"
            onClick={() =>
              (
                document.getElementById("my_modal_1") as HTMLDialogElement
              ).close()
            }>
            Close
          </button>
        </div>
      </dialog>
    </>
  )
}

export default CourseNotesCS
