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

    for (let courseElement of courseElements as HTMLElement[]) {
      //redefine course box structure for styling
      const info = courseElement.querySelector(".info")
      const content = courseElement.querySelector(".content")

      const courseBox = document.createElement("div")

      courseBox.appendChild(info)
      courseBox.appendChild(content)

      // Clear the courseElement
      while (courseElement.firstChild) {
        courseElement.removeChild(courseElement.firstChild)
      }

      // Append the courseBox to the courseElement
      courseElement.appendChild(courseBox)
      courseElement.style.display = "flex"
      courseElement.style.flexDirection = "row"
      courseElement.style.alignItems = "center"

      //assign button to each course
      const courseId = courseElement.getAttribute("data-courseid")
      const courseName = courseElement.querySelector("h3").textContent

      const buttonDiv = document.createElement("div")
      buttonDiv.style.marginLeft = "auto"

      // Append the new div to the course element
      if (!courseElement.classList.contains("paging"))
        courseElement.appendChild(buttonDiv)

      ReactDOM.render(
        <OpenNotesButton courseId={courseId} courseName={courseName} />,
        buttonDiv
      )
    }
  })
}

const OpenNotesButton = ({ courseId, courseName }) => {
  const [value, setValue] = useState(
    localStorage.getItem(`courseNote-${courseId}`) || ""
  )

  return (
    <>
      <button
        className="ml-auto border-2 border-gray-300 rounded-md p-2 hover:bg-gray-200"
        onClick={() =>
          (
            document.getElementById(`my_${courseId}_modal`) as HTMLDialogElement
          ).showModal()
        }>
        Open notes
      </button>
      <dialog id={`my_${courseId}_modal`} className="w-[50%] p-5 rounded-md">
        <h1 className="text-2xl font-bold">Notes for {courseName}</h1>
        <textarea
          placeholder="Add a note..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            localStorage.setItem(`courseNote-${courseId}`, e.target.value)
          }}
          className="w-full h-[200px] border-2 border-gray-300 rounded p-2"
          spellCheck="false"
        />
        <div className="flex flex-row w-full">
          <button
            className="ml-auto border-2 border-gray-300 rounded-md p-2 hover:bg-red-500 hover:text-white"
            onClick={() =>
              (
                document.getElementById(
                  `my_${courseId}_modal`
                ) as HTMLDialogElement
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
