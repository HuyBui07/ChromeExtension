import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

export const FastSearchSettingName = "MoodleFastSearch"

function MoodleFastSeachOption({ storage }) {
  const [fastSearchEnabled, setFastSearchEnabled] = useState(false)

  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getMoodleFastSearch()
  }, [])

  const setMoodleFastSearch = async (value) => {
    // Update the setting in storage
    await storage.set(FastSearchSettingName, value.toString())
    // Update the local state
    setFastSearchEnabled(value)
  }

  const getMoodleFastSearch = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(FastSearchSettingName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setFastSearchEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(FastSearchSettingName, "false")
      }
    } catch (error) {
      console.error("Error retrieving Moodle Fast Search setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Moodle fast search bar
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setMoodleFastSearch(e.target.checked)
              }}
              checked={fastSearchEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default MoodleFastSeachOption
