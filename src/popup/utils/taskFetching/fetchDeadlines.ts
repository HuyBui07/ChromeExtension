// Response is an array of object.
// Extract data field from first object in the array
// Then extract weeks field from data object
//In each week object, extract days field
//In each day object, extract events field

//Request parameters:
// args: {year : string, month : string, day : 1, view : "monthblock"} //Month is 1-indexed
// index: 0
// method_name: core_calendar_get_calendar_monthly_view
//Sample : [{"index":0,"method_name":"core_calendar_get_calendar_monthly_view","args":{"year":"2024","month":"5","day":1,"view":"monthblock"}}]

//URL sample : https://courses.uit.edu.vn/lib/ajax/service.php?sesskey=krBzBj0ovj&info=core_calendar_get_calendar_monthly_view
//POST request
//Extract sesskey from normal get "https://courses.uit.edu.vn" like in login

interface PopupDeadlineDay {
  mday: number
  wday: number
  month: number // 1-indexed. Will be passed from the component
  year: number
  isToday: boolean
}
interface Event {
  //Time is unix timestamp. Remember to convert to Vietnam time
  day: number //Day of month

  timestart: number
  instance: number //This is used to identify the event. Same instance means same event. Used to check for end time
  overdue: boolean
  course: CourseFromEvent
  name: string
  url: string
  eventype: string
  submitted?: boolean
}
interface CourseFromEvent {
  fullname: string
  shortname: string
  coursecategory: string
}

const normalLoginUrl = "https://courses.uit.edu.vn"
interface MoodleFetchDeadlines {
  fetchDeadlines: (storage: any) => Promise<Event[]>
}

const moodleFetchDeadlines: MoodleFetchDeadlines = {
  // Try fetch deadline from month 5
  fetchDeadlines: async (month: number) => {
    const sessKey = await fetchSessionKey()
    console.log("Sesskey : ", sessKey)
    const thisYear = new Date().getFullYear()
    const url =
      "https://courses.uit.edu.vn/lib/ajax/service.php?sesskey=" +
      sessKey +
      "&info=core_calendar_get_calendar_monthly_view"
    const args = {
      year: thisYear.toString(),
      month: month.toString(),
      day: 1,
      view: "monthblock"
    }
    const data = JSON.stringify([
      { index: 0, methodname: "core_calendar_get_calendar_monthly_view", args }
    ])
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
    const json = await response.json()
    console.log("Json : ", json)
    const deadlines = json[0].data.weeks.flatMap((week: any) =>
      // Turn them into event , only take relevant fields
      week.days.flatMap((day: any) =>
        day.events.map((event: any) => {
          return {
            day: day.mday,
            month: month,
            year: thisYear,
            timestart: event.timesort,
            instance: event.instance,
            overdue: event.overdue,
            course: {
              fullname: event.course.fullname,
              shortname: event.course.shortname,
              coursecategory: event.course.coursecategory
            },
            // General: quiz, assign.
            // If quiz, + event.eventtype (quizopen or quizclose)
            eventype:
              event.modulename === "quiz"
                ? "quiz" + event.eventtype
                : event.modulename,
            name: event.name,
            url: event.url
          }
        })
      )
    )

    // Remove duplicate where they have the same instance
    const uniqueDeadlinesMap = new Map()
    deadlines.forEach((deadline) => {
      uniqueDeadlinesMap.set(deadline.instance, deadline)
    })
    const uniqueDeadlines = Array.from(uniqueDeadlinesMap.values())

    return await Promise.all(
      uniqueDeadlines.map(async (deadline) => {
        const submitted = await checkSubmitted(deadline)
        return { ...deadline, submitted }
      })
    )
  }
}
export default moodleFetchDeadlines
async function fetchSessionKey() {
  const sessGetResponse = await fetch(normalLoginUrl)
  const sessGetHtml = await sessGetResponse.text()
  const sesskeyRegex = /"sesskey":"([^"]+)"/
  const sessKey = sessGetHtml.match(sesskeyRegex)
  if (!sessKey) {
    throw new Error("Sesskey not found")
  }
  return sessKey[1]
}

async function checkSubmitted(event: Event) {
  const response = await fetch(event.url)
  const html = await response.text()
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(html, "text/html")
  //If the event is a quiz. Check if class item "generaltable quizattemptsummary" which is a table. has a table body and has at least one row exist
  if (event.eventype === "quizopen" || event.eventype === "quizclose") {
    const quizAttemptSummary = doc.querySelector(
      ".generaltable.quizattemptsummary"
    )
    if (quizAttemptSummary) {
      const tableBody = quizAttemptSummary.querySelector("tbody")
      if (tableBody) {
        const rows = tableBody.querySelectorAll("tr")
        if (rows.length > 0) {
          return true
        }
      }
    }
  }
  //If the event is an assignment. Check if class item "submissionstatussubmitted" exist
  else if (event.eventype === "assign") {
    const submissionStatus = doc.querySelector(".submissionstatussubmitted")
    if (submissionStatus) {
      return true
    }
  }
  return false
}
