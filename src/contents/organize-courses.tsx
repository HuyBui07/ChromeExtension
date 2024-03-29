import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const OrganizeCoursesCS = () => {
  useEffect(() => {
    //get the branch that contains the program
    const educationalProgram = document.getElementsByClassName("depth_3")[6]

    //get the latest semester
    const latestSemester = educationalProgram.getElementsByTagName("li")[0]

    //get the courses in the latest semester
    const courses = latestSemester.getElementsByTagName("a")

    //get the course names
    const courseNames = []
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i]
      const courseName = course.innerHTML
      courseNames.push(courseName)
    }

    // Get the div that contains all different courses

    const coursesDiv = document.getElementsByClassName(
      "frontpage-course-list-enrolled"
    )[0]

    // Get all course elements in the div
    const courseElements = Array.from(coursesDiv.children)

    // Sort the course elements so that the ones with titles in courseNames are at the front
    courseElements.sort((a, b) => {
      const aName = a.textContent.trim()
      const bName = b.textContent.trim()
      const aInCourseNames = courseNames.some((courseName) =>
        aName.includes(courseName)
      )
      const bInCourseNames = courseNames.some((courseName) =>
        bName.includes(courseName)
      )

      if (aInCourseNames && !bInCourseNames) {
        return -1
      } else if (!aInCourseNames && bInCourseNames) {
        return 1
      } else {
        return 0
      }
    })

    // Remove all existing course elements from the div
    while (coursesDiv.firstChild) {
      coursesDiv.removeChild(coursesDiv.firstChild)
    }

    // Add the sorted course elements back to the div
    for (const courseElement of courseElements) {
      coursesDiv.appendChild(courseElement)
    }
  }, [])
  return null
}

export default OrganizeCoursesCS
