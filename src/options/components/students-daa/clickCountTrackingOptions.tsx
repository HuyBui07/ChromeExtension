import { useEffect, useState } from "react"

import { clearClickCountOnNav } from "~src/contents/student-moreNavigationTools"

export const StudentClickCountTrackingSettingName = "StudentClickCountTracking"

function StudentClickCountTrackingOption({ storage }) {
  const [trackingClickEnabled, setTrackingClickEnabled] = useState(false)
  const [hasCleared, setHasCleared] = useState(false)
  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getTrackingSetting()
  }, [])

  const setTracking = async (value) => {
    // Update the setting in storage
    await storage.set(StudentClickCountTrackingSettingName, value.toString())
    // Update the local state
    setTrackingClickEnabled(value)
  }

  const getTrackingSetting = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(StudentClickCountTrackingSettingName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setTrackingClickEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(StudentClickCountTrackingSettingName, "false")
      }
    } catch (error) {
      console.error("Error retrieving calendar setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Track and sort your navigation clicks based on most frequently visited
        sites
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setTracking(e.target.checked)
              }}
              checked={trackingClickEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <button
        className="option-button"
        onClick={async () => {
          await clearClickCountOnNav()
          setHasCleared(true)
        }}>
        Clear count data
      </button>
      {hasCleared && <div className="option-success">Count data cleared</div>}
    </>
  )
}

export default StudentClickCountTrackingOption
