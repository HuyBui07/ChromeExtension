import { useEffect, useState } from "react"

import "../../style.css"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import themes from "../constants/colorThemes"

function IndexPopup() {
  const storage = new Storage({ area: "local" })

  const [currentPallette, setCurrentPallette, { setStoreValue }] = useStorage({
    key: "currentPallette",
    instance: storage
  })
  const storedThemeName =
    currentPallette && currentPallette.name ? currentPallette.name : "Default"
  useEffect(() => {
    console.log("currentPallette", currentPallette)
  }, [currentPallette])

  const setTheme = async (themeName) => {
    if (themes[themeName] === null || themeName === "Default") {
      console.log("setting null")
      await storage.set("currentPallette", null).then(() => {
        setCurrentPallette(null)
      })
      return
    }

    await storage.set("currentPallette", { ...themes[themeName] })
    setCurrentPallette({ ...themes[themeName] })
  }

  return (
    <div className="popup-container">
      <div className="popup-header">Select Theme:</div>
      <div className="theme-select">
        <select
          onChange={(e) => {
            setTheme(e.target.value)
          }}
          value={storedThemeName}>
          {Object.keys(themes).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
      </div>

      <div className="popup-content">
        {currentPallette === null || currentPallette === undefined ? (
          <div className="color-text">Palette not set</div>
        ) : (
          <>
            <div className="color-section">
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{ backgroundColor: currentPallette.textColor }}></div>
                <div className="color-text">
                  Text Color: {currentPallette.textColor}
                </div>
              </div>
            </div>
            <div className="color-section">
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.backgroundColor
                  }}></div>
                <div className="color-text">
                  Background Color: {currentPallette.backgroundColor}
                </div>
              </div>
            </div>
            <div className="color-section">
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.primaryColor
                  }}></div>
                <div className="color-text">
                  Primary Color: {currentPallette.primaryColor}
                </div>
              </div>
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.secondaryColor
                  }}></div>
                <div className="color-text">
                  Secondary Color: {currentPallette.secondaryColor}
                </div>
              </div>
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.accentColor
                  }}></div>
                <div className="color-text">
                  Accent Color: {currentPallette.accentColor}
                </div>
              </div>
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.dangerColor
                  }}></div>
                <div className="color-text">
                  Danger Color: {currentPallette.dangerColor}
                </div>
              </div>
              <div className="theme-option">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: currentPallette.successColor
                  }}></div>
                <div className="color-text">
                  Success Color: {currentPallette.successColor}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default IndexPopup
