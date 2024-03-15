import React, { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

//Pallete 1 - Text Color: #EBE9FC, Background Color: #010104, Primary Color: #3A31D8, Secondary Color: #020024, Accent Color: #0600C2
//Default pallete - set all to null
function IndexPopup() {
  const storage = new Storage({ area: "local" })

  const [currentPallette, setCurrentPallete, { setStoreValue }] = useStorage({
    key: "currentPallette",
    instance: storage
  })

  //Set all to null
  const resetColors = async () => {
    await storage.set("currentPallette", {
      textColor: null,
      backgroundColor: null,
      primaryColor: null,
      secondaryColor: null,
      accentColor: null
    })
  }
  const setColors = async () => {
    //Convert above in to setting a single pallette object
    await storage.set("currentPallette", {
      textColor: "#EBE9FC",
      backgroundColor: "#010104",
      primaryColor: "#3A31D8",
      secondaryColor: "#020024",
      accentColor: "#0600C2"
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
      <button
        onClick={() => {
          setColors()
        }}>
        Set color
      </button>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <div>Current text color: {currentPallette?.textColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPallette?.textColor
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
        <div>Current background color: {currentPallette?.backgroundColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPallette?.backgroundColor
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
        <div>Current primary color: {currentPallette?.primaryColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPallette?.primaryColor
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
        <div>Current secondary color: {currentPallette?.secondaryColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPallette?.secondaryColor
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
        <div>Current accent color: {currentPallette?.accentColor}</div>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentPallette?.accentColor
          }}
        />
      </div>
      <button onClick={resetColors}>Reset colors</button>
    </div>
  )
}

export default IndexPopup
