import { useEffect, useState } from "react"

import "./index.css"

import { url } from "inspector"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import RefreshIcon from "~assets/refresh"
import DeadlineTask from "~src/components/DeadlineTask"
import type { Deadline, NewsItem, NewSource } from "~src/types"

import themes from "../constants/colorThemes"
import LogoutFromCourseButton from "./components/LogoutFromCourseButton"
import PopupLogin from "./components/PopupLogin"
import { DAANewSource, OEPNewSource } from "./utils/newFetching/newSources"
import { removeDayTime } from "./utils/newFetching/removeDayTime"
import { shortenText } from "./utils/shortenText"
import moodleFetchDeadlines from "./utils/taskFetching/fetchDeadlines"

const NEXT_ARROW_ICON = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-right"
      viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M11.354 8.354a.5.5 0 0 0 0-.708l-7-7a.5.5 0 0 0-.708.708L10.293 8l-6.647 6.646a.5.5 0 0 0 .708.708l7-7a.5.5 0 0 0 0-.708z"
      />
    </svg>
  )
}
const PREVIOUS_ARROW_ICON = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M4.646 8.354a.5.5 0 0 1 0-.708l7-7a.5.5 0 0 1 .708.708L5.707 8l6.647 6.646a.5.5 0 0 1-.708.708l-7-7a.5.5 0 0 1 0-.708z"
      />
    </svg>
  )
}
const MAX_NEWS_ITEMS = 5
const TEXT_LIMIT = 40
const availableNewsSources = [DAANewSource, OEPNewSource]

function IndexPopup() {
  const storage = new Storage({ area: "local" })
  const [news, setNews] = useState([] as NewsItem[]) // To show
  const [newsCached, setNewsCached] = useState(
    {} as Record<string, NewsItem[]> | null
  )
  const [isFetchingNews, setIsFetchingNews] = useState(false)
  const [currentNewsSource, setCurrentNewsSource] = useState(
    availableNewsSources[0]
  )
  const [currentNewType, setCurrentNewType] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [deadlines, setDeadlines] = useState([])
  const [deadlineMonth, setDeadlineMonth] = useState(new Date().getMonth() + 1)
  const [isFetchingDeadlines, setIsFetchingDeadlines] = useState(false)

  useEffect(() => {
    setNewsFromStorage()
  }, [])

  useEffect(() => {
    onNewTypeChange(currentNewType)
  }, [currentNewType])

  useEffect(() => {
    onNewSourceChange(currentNewsSource)
  }, [currentNewsSource])

  useEffect(() => {
    if (isLoggedIn) {
      fetchDeadlines()
    }
  }, [deadlineMonth, isLoggedIn])

  const onNewSourceChange = async (newSource) => {
    setCurrentNewsSource(newSource)
    setNewsCached(null)
    setNews([])
    setCurrentNewType(null)
    setNewsFromStorage()
  }

  const onNewTypeChange = async (newType) => {
    if (currentNewType && newsCached) {
      const news = await currentNewsSource.fetchFromStorage().then((news) => {
        return news[currentNewType]
      })
      try {
        setNews(news)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const setNewsFromStorage = async () => {
    const defaultOption = currentNewsSource.sectionOptions[0]
    const news = await currentNewsSource.fetchFromStorage()
    setCurrentNewType(defaultOption)
    setNewsCached(news)
    setNews(news[defaultOption])
  }

  const requestRefreshStudentNew = async () => {
    setIsFetchingNews(true)

    const newsObj = await currentNewsSource.fetch()
    const defaultOption = currentNewsSource.sectionOptions[0]
    setNewsCached(newsObj)
    setCurrentNewType(defaultOption)
    setNews(newsObj[defaultOption])
    setIsFetchingNews(false)
  }

  const cleanStorage = async () => {
    await currentNewsSource.cleanStorage()
    setNews([])
    setNewsCached(null)
    setCurrentNewType(null)
  }

  const fetchDeadlines = async () => {
    setIsFetchingDeadlines(true)
    const deadlines = await moodleFetchDeadlines.fetchDeadlines(deadlineMonth)
    const deadlineObjects = deadlines.map((deadline) => {
      return {
        content: deadline.course.shortname + " - " + deadline.name,
        timestamp: deadline.timestart,
        submitted: deadline.submitted,
        year: new Date().getFullYear(),
        month: deadlineMonth,
        day: deadline.day,
        url: deadline.url
      }
    })
    setDeadlines(deadlineObjects)
    setIsFetchingDeadlines(false)
  }

  const afterSuccessfulLogin = async () => {
    setIsLoggedIn(true)
    fetchDeadlines()
  }

  const afterSuccessfulLogout = async () => {
    setIsLoggedIn(false)
  }

  const handlePreviousMonth = () => {
    setDeadlineMonth((prevMonth) => (prevMonth > 1 ? prevMonth - 1 : 12))
  }

  const handleNextMonth = () => {
    setDeadlineMonth((prevMonth) => (prevMonth < 12 ? prevMonth + 1 : 1))
  }

  return (
    <div className="popup-container">
      <div className="popup-header">Ezuit</div>
      <div className="popup-content">
        <div className="deadlines-header">
          <span>Deadlines</span>
          {isLoggedIn && (
            <div className="deadline-controls">
              <button
                onClick={handlePreviousMonth}
                disabled={isFetchingDeadlines}>
                <PREVIOUS_ARROW_ICON />
              </button>

              <span style={{ padding: "0 10px" }}>
                {new Date(0, deadlineMonth - 1).toLocaleString("default", {
                  month: "long"
                })}
              </span>
              <button onClick={handleNextMonth} disabled={isFetchingDeadlines}>
                {" "}
                <NEXT_ARROW_ICON />
              </button>
            </div>
          )}
          {isLoggedIn && (
            <LogoutFromCourseButton
              afterLogout={afterSuccessfulLogout}
              storage={storage}
              disabled={isFetchingDeadlines}
            />
          )}
        </div>

        <div className="major-deadlines-container">
          {isLoggedIn ? (
            <>
              {isFetchingDeadlines ? (
                <div className="deadline-item">Fetching deadlines...</div>
              ) : deadlines.length > 0 ? (
                deadlines.map((deadline, index) => (
                  <DeadlineTask key={index} task={deadline} />
                ))
              ) : (
                <div className="deadline-item">Nothing to do!</div>
              )}
            </>
          ) : (
            <PopupLogin storage={storage} afterLogin={afterSuccessfulLogin} />
          )}
        </div>
      </div>
      <div className="popup-content">
        <div className="news-header">News</div>
        <div className="news-options">
          <div className="news-source-select">
            <select
              onChange={(e) => {
                const newSource = availableNewsSources.find(
                  (source) => source.name === e.target.value
                )
                onNewSourceChange(newSource)
              }}
              value={currentNewsSource.name}>
              {availableNewsSources.map((source) => (
                <option key={source.name} value={source.name}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
          <div className="news-source-type-select">
            <select
              onChange={(e) => {
                setCurrentNewType(e.target.value)
              }}
              value={currentNewType}>
              {currentNewsSource.sectionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div
            className="news-refresh"
            style={{ width: "20px", height: "20px" }}
            onClick={requestRefreshStudentNew}>
            <RefreshIcon isLoading={isFetchingNews} />
          </div>
        </div>
        <div className="news-container">
          {news.length > 0 && !isFetchingNews ? (
            <>
              {news.slice(0, MAX_NEWS_ITEMS).map((item) => (
                <div key={item.link} className="news-item">
                  <a
                    href={currentNewsSource.source + item.link}
                    target="_blank">
                    {shortenText(item.title, TEXT_LIMIT)} -{" "}
                    {removeDayTime(item.datePosted)}
                  </a>
                </div>
              ))}
              <div className="more-news">
                <a href={currentNewsSource.source} target="_blank">
                  View More
                </a>
              </div>
            </>
          ) : (
            <div className="news-item news-status-fetching">
              {isFetchingNews ? "Fetching News..." : "No News"}
            </div>
          )}
        </div>
        <div className="more-options-container">
          <div className="more-options">
            <a href="options.html" target="_blank">
              More Options
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
