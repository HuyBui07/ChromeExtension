import type { Deadline } from "~src/types"

const DeadlineTask = ({ task }: { task: Deadline }) => {
  //Get class status name

  const convertFromUnixTimeToVietNamTime = (unixTime: number) => {
    const timeZoneDifferent = 7
    const date = new Date(unixTime * 1000)
    const vietNamTime = new Date(
      date.getTime() + timeZoneDifferent * 60 * 60 * 1000
    )
    return vietNamTime
  }
  const deadlineTimeInViet = convertFromUnixTimeToVietNamTime(task.timestamp)

  const getStatus = () => {
    // Submitted false and due date is less than today => deadline-item-status-late
    //   Submitted false and due date is greater than today => deadline-item-status-due
    //   Submitted true => deadline-item-status-submitted
    //Use time in vietnam to compare
    if (task.submitted) {
      return "deadline-item-status-submitted"
    } else {
      const today = new Date()
      const deadline = new Date(deadlineTimeInViet)
      if (deadline < today) {
        return "deadline-item-status-late"
      } else {
        return "deadline-item-status-due"
      }
    }
  }
  //Return exact number of days if less than 30 days.
  //If more than 30 days, return "more than 30 days"
  const checkDueDate = () => {
    const today = new Date()
    const deadline = new Date(task.year, task.month - 1, task.day)
    const timeDifference = deadline.getTime() - today.getTime()
    const dayDifference = timeDifference / (1000 * 3600 * 24)

    if (dayDifference < 0) {
      return "Overdue"
    } else if (dayDifference < 2) {
      return "Due in 1 day"
    } else if (dayDifference < 30) {
      return `Due in ${Math.floor(dayDifference)} days`
    } else {
      return "Due in more than 30 days"
    }
  }
  return (
    <div className="deadlines-container">
      <a href={task.url} className="deadline-item" target="_blank">
        <span className="deadline-item-name">{task.content}</span>
        <span>
          Due:{" "}
          {convertFromUnixTimeToVietNamTime(task.timestamp).toLocaleDateString(
            "en-GB"
          )}
        </span>
        <span>
          Status:{" "}
          <span className={getStatus()}>
            {task.submitted ? "Submitted" : "Not submitted"}
          </span>
        </span>

        <div className="deadline-item-divider">
          <div></div>
        </div>
      </a>
    </div>
  )
}

export default DeadlineTask
