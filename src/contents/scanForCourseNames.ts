import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}

const ScanForCourseNames = async () => {
  const courseNameList = JSON.parse(
    localStorage.getItem("courseNameList") || "{}"
  )

  const dates = document.getElementsByTagName("td")

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    if (date.className.includes("hasevent")) {
      const a = date.getElementsByTagName("a")[0]
      const eventName = date.getElementsByClassName("eventname")
      const eventHref = date.querySelectorAll('[data-action="view-event"]')
      const fetchPromises = [] // Array to hold all fetch promises

      for (let j = 0; j < eventName.length; j++) {
        const href = eventHref[j].getAttribute("href")
        if (courseNameList[href]) {
          continue
        }

        // Push each fetch promise into the array
        fetchPromises.push(
          fetch(href).then(async (response) => {
            const data = await response.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(data, "text/html")
            const courseName = doc
              .getElementsByClassName("page-header-headings")[0]
              .getElementsByTagName("h1")[0].innerHTML
            return { href, courseName } // Return an object with href and courseName
          })
        )
      }

      // Wait for all fetch promises to complete
      const results = await Promise.all(fetchPromises)

      // Update courseNameList with the results
      for (const result of results) {
        courseNameList[result.href] = result.courseName
      }
    }
  }

  localStorage.setItem("courseNameList", JSON.stringify(courseNameList))
}

const observer = new MutationObserver(ScanForCourseNames)

const maincalendar = document.getElementsByClassName("maincalendar")[0]

observer.observe(maincalendar, {
  attributes: true,
  childList: false,
  subtree: true
})
