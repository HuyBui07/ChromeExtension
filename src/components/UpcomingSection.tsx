import "../../style.css"

import type { Deadline } from "../types"

const UpcomingSection = ({ deadlines }: { deadlines: Deadline[] }) => {
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
      <details className="details">
        <summary className="summary mb-2">
          <h5 className="mb-0">Upcoming ({upcomingDeadlines.length})</h5>
        </summary>
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
      </details>
      <details className="details">
        <summary className="summary mb-2">
          <h5 className="mb-0">Over Due ({pastDeadlines.length})</h5>
        </summary>
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
      </details>
    </>
  )
}

export default UpcomingSection
