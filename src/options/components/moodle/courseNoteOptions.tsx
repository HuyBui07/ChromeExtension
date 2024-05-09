import { useEffect, useState } from "react"

export const CourseNoteSettingName = "CourseNote"

function CourseNoteOption({ storage }) {
  const [courseNoteEnabled, setCourseNoteEnabled] = useState(false)

  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getCourseNoteSetting()
  }, [])

  const setCourseNote = async (value) => {
    // Update the setting in storage
    await storage.set(CourseNoteSettingName, value.toString())
    // Update the local state
    setCourseNoteEnabled(value)
  }

  const getCourseNoteSetting = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(CourseNoteSettingName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setCourseNoteEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(CourseNoteSettingName, "false")
      }
    } catch (error) {
      console.error("Error retrieving Course Note setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Course notes
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setCourseNote(e.target.checked)
              }}
              checked={courseNoteEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default CourseNoteOption
