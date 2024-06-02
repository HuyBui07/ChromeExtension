import type { Deadline } from "~src/types"

const DeadlineTask = ({ task }: { task: Deadline }) => {
  //Get class status name
  const getStatus = () => {
    // Submitted false and due date is less than today => deadline-item-status-late
    //   Submitted false and due date is greater than today => deadline-item-status-due
    //   Submitted true => deadline-item-status-submitted
    if (task.submitted) {
      return "deadline-item-status-submitted"
    } else {
      const today = new Date()
      const deadline = new Date(task.year, task.month - 1, task.day)
      if (deadline < today) {
        return "deadline-item-status-late"
      } else {
        return "deadline-item-status-due"
      }
    }
  }
  return (
    <>
      <div className="deadlines-container">
        <div className="deadline-item">
          <span className="deadline-item-name">{task.content}</span>
          <span>Due: 12/12/2021</span>
          <span>
            Status: <span className={getStatus()}>Due in 2 days</span>
          </span>

          <div className="deadline-item-divider">
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeadlineTask
