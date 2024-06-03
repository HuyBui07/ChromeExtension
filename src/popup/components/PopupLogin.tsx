import React, { useEffect, useState } from "react"

//Course/ moodle login function.
//If successful, it will set MoodleSession and MOODLEID cookies
const PopupLogin = ({ storage, afterLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const loginUrl = "https://courses.uit.edu.vn/login/index.php"
  //On first load, try to login with stored credentials
  //If successful, set MoodleSession and MOODLEID cookies
  //if not , show error "No stored credentials found"

  useEffect(() => {
    checkLoggedIn()
  }, [])

  //Attempt to login with stored credentials
  async function loginWithStoredCredentials() {
    setError("")
    setLoading(true)
    const username = await storage.get("moodleUsername")
    const password = await storage.get("moodlePassword")
    if (username && password) {
      console.log("Attempting to login with stored credentials")
      await sendLoginRequest(username, password, true)
    } else {
      console.log("No stored credentials found")
      setError("No stored credentials found")
    }
    setLoading(false)
  }
  //Check is logged in by using loginToken on login page
  //If logged in, call afterLogin callback
  //if not , call login with stored credentials
  const checkLoggedIn = async () => {
    setError("")
    setLoading(true)

    const response = await fetch(loginUrl)
    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const loginToken = doc.querySelector('input[name="logintoken"]')
    if (!loginToken) {
      console.log("Already logged in")
      if (afterLogin) {
        afterLogin()
      }
    } else {
      console.log("Not logged in")
      loginWithStoredCredentials()
    }
    setLoading(false)
  }

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    await sendLoginRequest(username, password)
  }

  const sendLoginRequest = async (username, password, isStored = false) => {
    setLoading(true)
    let loginToken = ""
    const parser = new DOMParser()

    try {
      const getResponse = await fetch(loginUrl)
      const getToken = await getResponse.text()

      const doc = parser.parseFromString(getToken, "text/html")
      const tokenElement = doc.querySelector(
        'input[name="logintoken"]'
      ) as HTMLInputElement

      if (tokenElement) {
        loginToken = tokenElement.value
        console.log("Login Token:", loginToken)
      } else {
        console.error("Login token element not found. Already logged in")
        setLoading(false)
        if (afterLogin) {
          afterLogin()
        }
        return
      }
    } catch (error) {
      console.error("Error fetching the login token:", error)
    }

    const data = {
      username: username,
      password: password,
      logintoken: loginToken,
      anchor: ""
    }

    try {
      const response = (await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
      })) as Response

      const loginDoc = parser.parseFromString(
        await response.text(),
        "text/html"
      )
      const errorMessage = loginDoc.getElementById("loginerrormessage")

      if (errorMessage) {
        console.log("Login failed:", errorMessage.textContent)
        setError(errorMessage.textContent)
      } else {
        console.log("Login successful")

        // Ask the user if they want to store credentials
        if (!isStored) {
          const storeCredentials = window.confirm(
            "Do you want to store your credentials?"
          )
          if (storeCredentials) {
            await storage.set("moodleUsername", username)
            await storage.set("moodlePassword", password)
          }
        }
        console.log("Header:", response.headers.get("Set-Cookie"))
        // Callback after successful login
        if (afterLogin) {
          afterLogin()
        }
      }
    } catch (error) {
      console.error("Error processing login:", error)
      setError("Error processing login. Please try again later.")
    }

    setLoading(false)
  }
  return (
    <div className="login-container">
      <form onSubmit={login} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          //if enter is pressed, submit the form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login(e)
            }
          }}
          className="login-input"
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  )
}

export default PopupLogin
