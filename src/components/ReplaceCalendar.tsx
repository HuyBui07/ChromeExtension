import "../../style.css"

import type { Deadline } from "../types"

const ReplaceCalendar = ({ deadlines }: { deadlines: Deadline[] }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div>
      {deadlines.map((item, index) => {
        const date = new Date(item.year, item.month - 1, item.day)
        return (
          <div className="deadline-tile " key={index} onClick={() => {
            window.location.href = "/calendar/view.php?view=day&time=" + item.timestamp
          }}>
            {weekdays[date.getDay()]}, {item.day}/{item.month}/{item.year}
          </div>
        )
      })}
    </div>
  )
}

export default ReplaceCalendar
