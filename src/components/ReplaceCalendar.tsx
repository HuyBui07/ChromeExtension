import "../../style.css"

const ReplaceCalendar = ({ deadlines }) => {
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
