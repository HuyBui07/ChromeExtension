import "../../style.css"
import type  { Deadline } from "../types"


const ReplaceCalendar = ({ deadlines }: { deadlines: Deadline[] }) => {
  return (
    <div>
      {deadlines.map((item, index) => (
        <div className="deadline-tile" key={index}>
          {item.day}/{item.month}/{item.year}
        </div>
      ))}
    </div>
  )
}

export default ReplaceCalendar
