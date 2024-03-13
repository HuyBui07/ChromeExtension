import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const handleClick = () => {
    chrome.storage.sync.set({ draculaTheme: true }, () => {
      console.log('The "draculaTheme" setting has been saved.')
    })

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: "color_change" })
    })
  }

  const handleDelete = () => {
    chrome.storage.sync.set({ draculaTheme: false }, () => {
      console.log('The "draculaTheme" setting has been deleted.')
    })

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: "revert_changes" })
    })
  }

  return (
    <div className="w-64 h-64">
      <button onClick={handleClick} className="button mb-9">
        Dracula
      </button>
      <button onClick={handleDelete} className="button">
        Delete theme
      </button>
    </div>
  )
}

export default IndexPopup
