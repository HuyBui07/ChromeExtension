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
    key: "currentPallette",
    instance: storage
  })
  useEffect(() => {
    console.log("currentPallette", currentPalette)
  }, [currentPalette])
  const setColors = async () => {
    await storage.set("currentPallette", {
      textColor: "#EBE9FC",
      backgroundColor: "#010104",
      primaryColor: "#3A31D8",
      secondaryColor: "#020024",
      accentColor: "#0600C2",
      dangerColor: "#8B0000",
      successColor: "#008000"
    })
  }

  const resetColors = async () => {
    //Set straight to null
    await storage.set("currentPallette", null)
  }

  return (
    <div
      style={{
        padding: 16,
        height: 400,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F1F3F0"
      }}>
      <div className="text-section">
        <div className="color-text">
          Current text color: {currentPalette?.textColor}
        </div>
        <div
          className="color-box"
          style={{
            backgroundColor: currentPalette?.textColor
          }}
        />
      </div>
      <div className="text-section">
        <div className="color-text">
          Current background color: {currentPalette?.backgroundColor}
        </div>
        <div
          className="color-box"
          style={{
            backgroundColor: currentPalette?.backgroundColor
          }}
        />
      </div>
      <div className="text-section">
        <div className="color-text">
          Current primary color: {currentPalette?.primaryColor}
        </div>
        <div
          className="color-box"
          style={{
            backgroundColor: currentPalette?.primaryColor
          }}
        />
      </div>
      <div className="text-section">
        <div className="color-text">
          Current secondary color: {currentPalette?.secondaryColor}
        </div>
        <div
          className="color-box"
          style={{
            backgroundColor: currentPalette?.secondaryColor
          }}
        />
      </div>
      <div className="text-section">
        <div className="color-text">
          Current accent color: {currentPalette?.accentColor}
        </div>
        <div
          className="color-box"
          style={{
            backgroundColor: currentPalette?.accentColor
          }}
        />
      </div>
      <button onClick={setColors} className="button">
        Set color
      </button>
      <button onClick={resetColors} className="button-danger">
        Reset colors
      </button>
    </div>
  )
}

export default IndexPopup
