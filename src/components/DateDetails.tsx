import type { DeadlineDetails } from "~src/types"

import "../../style.css"

const DateDetails = ({ deadlines }: { deadlines: DeadlineDetails[] }) => {
  //get the submitted and unsubmitted deadlines from the local storage
  const submittedDeadlines = JSON.parse(
    localStorage.getItem("submittedDeadlines") || "[]"
  )

  return (
    <div className="flex flex-col w-[100%]">
      {deadlines.map((deadline, index) => (
        <div key={index} className="deadline-tile w-[100%]">
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
