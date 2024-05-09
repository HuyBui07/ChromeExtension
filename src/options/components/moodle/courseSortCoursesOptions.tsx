import { useEffect, useState } from "react"

export const SortCoursesSettingName = "SortCourses"

function SortCoursesOption({ storage }) {
  const [sortCourseEnabled, setSortCourseEnabled] = useState(false)

  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getSortCourseSetting()
  }, [])

  const setSortCourses = async (value) => {
    // Update the setting in storage
    await storage.set(SortCoursesSettingName, value.toString())
    // Update the local state
    setSortCourseEnabled(value)
  }

  const getSortCourseSetting = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(SortCoursesSettingName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setSortCourseEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(SortCoursesSettingName, "false")
      }
    } catch (error) {
      console.error("Error retrieving Course Note setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Sort course by newest
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setSortCourses(e.target.checked)
              }}
              checked={sortCourseEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default SortCoursesOption
