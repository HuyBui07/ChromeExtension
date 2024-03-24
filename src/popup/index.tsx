import { useEffect, useState } from "react"

import "../../style.css"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

//Pallete 1 - Text Color: #EBE9FC, Background Color: #010104, Primary Color: #3A31D8, Secondary Color: #020024, Accent Color: #0600C2
//Default pallete - set all to null

function IndexPopup() {
  const storage = new Storage({ area: "local" })

  const [currentPalette, setCurrentPalette, { setStoreValue }] = useStorage({
    key: "currentPalette",
    instance: storage
  })

  const setColors = async () => {
    await storage.set("currentPallette", {
      textColor: "#EBE9FC",
      backgroundColor: "#010104",
      primaryColor: "#3A31D8",
      secondaryColor: "#020024",
      accentColor: "#0600C2"
    })
  }

  const resetColors = async () => {
    const originalPalette = await storage.get("originalPalette")
    if (originalPalette) {
      await storage.set("currentPallette", originalPalette)
    } else {
      await storage.set("currentPallette", {
        textColor: null,
        backgroundColor: null,
        primaryColor: null,
        secondaryColor: null,
        accentColor: null
      })
    }
  }
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
    <div
      style={{
        padding: 16,
        height: 400,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
      <button onClick={setColors}>Set color</button>
      <button onClick={resetColors}>Reset colors</button>
      <button onClick={handleClick} className="button mb-9">
        Dracula
      </button>
      <button onClick={handleDelete} className="button">
        Delete theme
      </button>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current text color: {currentPalette?.textColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPalette?.textColor
          }}
        />
      </div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current background color: {currentPalette?.backgroundColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPalette?.backgroundColor
          }}
        />
      </div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current primary color: {currentPalette?.primaryColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPalette?.primaryColor
          }}
        />
      </div>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current secondary color: {currentPalette?.secondaryColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPalette?.secondaryColor
          }}
        />
      </div>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current accent color: {currentPalette?.accentColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPalette?.accentColor
          }}
        />
      </div>
    </div>
  )
}

export default IndexPopup
