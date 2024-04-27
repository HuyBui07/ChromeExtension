import "../../style.css"

import type { Deadline } from "../types"

const ReplaceCalendar = ({ deadlines }: { deadlines: Deadline[] }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date()

  // Sort the deadlines by date
  const upcomingDeadlines = deadlines.filter(
    (deadline) =>
      new Date(deadline.year, deadline.month - 1, deadline.day) >= today
  )

  const pastDeadlines = deadlines
    .filter(
      (deadline) =>
        new Date(deadline.year, deadline.month - 1, deadline.day) < today
    )
    .reverse()

  return (
    <>
      <div>
        <h5 className="text-upcoming text-center">- Upcoming -</h5>
        {upcomingDeadlines.map((item, index) => {
          const date = new Date(item.year, item.month - 1, item.day)
          return (
            <div
              className="deadline-tile"
              key={index}
              onClick={() => {
                window.location.href = item.href
              }}>
              <span className="font-bold">
                {weekdays[date.getDay()]}, {item.day}/{item.month}/{item.year}
              </span>

              <div
                style={item.submitted ? { color: "green" } : { color: "red" }}
                key={index}>
                - {item.content}
              </div>
            </div>
          )
        })}
      </div>
      <h5 className="text-overdue text-center">- Over Due -</h5>
      <div>
        {pastDeadlines.map((item, index) => {
          const date = new Date(item.year, item.month - 1, item.day)
          return (
            <div
              className="deadline-tile"
              key={index}
              onClick={() => {
                window.location.href = item.href
              }}>
              <span className="font-bold">
                {weekdays[date.getDay()]}, {item.day}/{item.month}/{item.year}
              </span>

              <div key={index}>- {item.content}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ReplaceCalendar
