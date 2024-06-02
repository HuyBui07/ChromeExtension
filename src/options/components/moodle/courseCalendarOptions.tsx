import { useEffect, useState } from "react"

export const CalendarSettingName = "Calendar"

function CourseCalendarOption({ storage }) {
  const [calendarEnabled, setCalendarEnabled] = useState(false)

  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getCalendarSetting()
  }, [])

  const setCourseNote = async (value) => {
    // Update the setting in storage
    await storage.set(CalendarSettingName, value.toString())
    // Update the local state
    setCalendarEnabled(value)
  }

  const getCalendarSetting = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(CalendarSettingName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setCalendarEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(CalendarSettingName, "false")
      }
    } catch (error) {
      console.error("Error retrieving calendar setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Remove unnecessary sections and change calendar layout to display full
        event details
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setCourseNote(e.target.checked)
              }}
              checked={calendarEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default CourseCalendarOption
