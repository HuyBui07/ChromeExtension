import type { DeadlineDetails } from "~src/types"
import "../../style.css"

const DateDetails = ({ deadlines }: { deadlines: DeadlineDetails[] }) => {
  return (
    <div className="flex flex-col w-[100%]">
      {deadlines.map((deadline, index) => (
        <div key={index} className="deadline-tile w-[100%]">
          <a href={deadline.href}>{deadline.content}</a>
        </div>
      ))}
    </div>
  )
}

export default DateDetails
