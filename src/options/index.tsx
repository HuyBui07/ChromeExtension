import React, { useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import themes from "~src/constants/colorThemes"

import "./index.css"

import CourseFastSearchBar from "~src/contents/courseFastSearch"

import CourseCalendarOption from "./components/moodle/courseCalendarOptions"
import CourseNoteOption from "./components/moodle/courseNoteOptions"
import SortCoursesOption from "./components/moodle/courseSortCoursesOptions"
import CourseThemeOption from "./components/moodle/courseThemeOptions"
import MoodleFastSeachOption from "./components/moodle/moodleFastSearchOption"
import StudentClickCountTrackingOption from "./components/students-daa/clickCountTrackingOptions"
import StudentImproveLinkOption from "./components/students-daa/studentImproveLinkSetting"

function OptionsIndex() {
  const storage = new Storage({ area: "local" })

  return (
    <>
      <fieldset className="options-fieldset">
        <legend className="options-legend">Moodle settings</legend>
        <CourseThemeOption storage={storage} />
        <MoodleFastSeachOption storage={storage} />
        <CourseNoteOption storage={storage} />
        <CourseCalendarOption storage={storage} />
        <SortCoursesOption storage={storage} />
      </fieldset>
      <fieldset className="options-fieldset">
        <legend className="options-legend">Student/DAA settings</legend>
        <StudentImproveLinkOption storage={storage} />
        <StudentClickCountTrackingOption storage={storage} />
      </fieldset>
    </>
  )
}

export default OptionsIndex
