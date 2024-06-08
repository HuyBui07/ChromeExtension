import type { DeadlineDetails } from "~src/types"

import "../../style.css"

const DateDetails = ({ deadlines }: { deadlines: DeadlineDetails[] }) => {
  //get the submitted and unsubmitted deadlines from the local storage
  const submittedDeadlines = JSON.parse(
    localStorage.getItem("submittedDeadlines") || "[]"
  )

  // Get course name from the local storage
  const courseNameList = JSON.parse(
    localStorage.getItem("courseNameList") || "{}"
  )

  return (
    <div className="flex flex-col w-[100%]">
      {deadlines.map((deadline, index) => (
        <div key={index} className="deadline-tile w-[100%]">
          <span className="font-bold">
            {courseNameList[deadline.href]
              ? courseNameList[deadline.href].split(" - ")[0]
              : null}
          </span>
          <a
            href={deadline.href}
            style={
              submittedDeadlines.includes(deadline.href)
                ? { color: "green" }
                : { color: "red" }
            }>
            {deadline.content}
          </a>
        </div>
      ))}
    </div>
  )
}

export default DateDetails
