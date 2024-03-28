import type { PlasmoCSConfig } from "plasmo"

import { relayMessage } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import {
  changeElementColor,
  undoChangeElementColor
} from "./changeColor/changeParts"
import { adjust, storeOriginalColor } from "./changeColor/utils"

export const config: PlasmoCSConfig = {
  matches: ["https://courses.uit.edu.vn/"],
  all_frames: true
}
//TODO: refactor to use storage
//List of elements to change color. Same line means they have the same color. Also consider border color
//  card background-color, .block background-color, #region-main background-color, .navbar-bootswatch background-color, dropdown-menu background-color
// popover background-color (actual body bg), popover-header background-color, popover-body background-color
// calendar :
//  + today: .maincalendar .calendarmonth td.today .day-number-circle
//body background-color,
//TEXT COLOR: Same line means similar color
// body : originally black
// a : originally blue
// popover-body : originally black
// popover-header : originally white

//Border : #frontpage-available-course-list .coursebox, #frontpage-course-list .coursebox, .course-search-result .coursebox
//#frontpage-available-course-list .coursebox, #frontpage-course-list .coursebox, .course-search-result .coursebox
//
//Some buttons :  btn btn-secondary
const storage = new Storage({
  area: "local"
})
storeOriginalColor()

storage.get("currentPallette").then((pallette: any) => {
  if (pallette) {
    changeElementColor(pallette)
  }
})
//Watch current pallete
storage.watch({
  currentPallette: (c) => {
    if (c.newValue) {
      changeElementColor(c.newValue)
    } else {
      undoChangeElementColor()
    }
  }
})
