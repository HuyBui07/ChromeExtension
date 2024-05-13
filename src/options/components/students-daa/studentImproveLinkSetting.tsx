import { useEffect, useState } from "react"

export const StudentImproveLinksSettingsName = "StudentSiteImproveLinks"

function StudentImproveLinkOption({ storage }) {
  const [studentLinksEnabled, setStudentLinksEnabled] = useState(false)

  useEffect(() => {
    // Load Moodle Fast Search setting when component mounts
    getStudentLinksSetting()
  }, [])

  const setStudentLinks = async (value) => {
    // Update the setting in storage
    await storage.set(StudentImproveLinksSettingsName, value.toString())
    // Update the local state
    setStudentLinksEnabled(value)
  }

  const getStudentLinksSetting = async () => {
    try {
      // Retrieve the setting from storage
      const setting = await storage.get(StudentImproveLinksSettingsName)
      // If setting is not null, update the local state
      if (setting !== null) {
        setStudentLinksEnabled(setting === "true")
      } else {
        // Initialize setting if not set
        await storage.set(StudentImproveLinksSettingsName, "false")
      }
    } catch (error) {
      console.error("Error retrieving calendar setting:", error)
    }
  }

  return (
    <>
      <div className="option-select-inline-header">
        Turn site link into boxes
        <div className="option-switch">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setStudentLinks(e.target.checked)
              }}
              checked={studentLinksEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default StudentImproveLinkOption
