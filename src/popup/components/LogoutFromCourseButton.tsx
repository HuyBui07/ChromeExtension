import React, { useState } from "react"

//Receive a after log out function to be called after the user is logged out
//On click ,will log user out from moodle. And call afterLogout function
//WARNING: This will also clear out stored credentials
const LogoutFromCourseButton = ({ storage, afterLogout }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const loginUrl = "https://courses.uit.edu.vn/login/index.php"
  const logoutUrl = "https://courses.uit.edu.vn/login/logout.php"
  const normalUrl = "https://courses.uit.edu.vn/"
  //Log out from moodle by attaching sesskey
  const logout = async () => {
    setError("")
    setLoading(true)

    //GET sesskey from the normal page. If failed, meaning already logged out
    const sessGetResponse = await fetch(normalUrl)
    const sessGetHtml = await sessGetResponse.text()
    const sesskeyRegex = /"sesskey":"([^"]+)"/
    const sessKey = sessGetHtml.match(sesskeyRegex)
    console.log("SESSION KEY", sessKey[1])
    if (!sessKey) {
      console.log("Already logged out")
      if (afterLogout) {
        afterLogout()
      }

      setLoading(false)
      return
    }
    //Get the logout url

    const response = await fetch(
      "https://courses.uit.edu.vn/login/logout.php?sesskey=" + sessKey[1]
    )
    //Success if status is 303 or 200
    if (response.status === 303 || response.status === 200) {
      console.log("Logged out")
      //Clear stored credentials
      await storage.set("moodleUsername", "")
      if (afterLogout) {
        afterLogout()
      }
    } else {
      console.log("Failed to log out")
      setError("Failed to log out")
    }
    setLoading(false)
  }

  return (
    <div className="logout-btn-container">
      <button className="logout-btn" onClick={logout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
      <p>{error}</p>
    </div>
  )
}

export default LogoutFromCourseButton
