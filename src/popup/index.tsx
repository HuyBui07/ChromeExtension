import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "draculaTheme" })
    })
  }

  return (
    <div className="w-64 h-64">
      <button onClick={handleClick} className="w-5 h-5 bg-red-500">
        Click
      </button>
    </div>
  )
}

export default IndexPopup
