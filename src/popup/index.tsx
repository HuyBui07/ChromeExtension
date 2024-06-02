import { useEffect, useState } from "react"

import "./index.css"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import RefreshIcon from "~assets/refresh"
import DeadlineTask from "~src/components/DeadlineTask"
import type { NewsItem, NewSource } from "~src/types"

import themes from "../constants/colorThemes"
import LogoutFromCourseButton from "./components/LogoutFromCourseButton"
import PopupLogin from "./components/PopupLogin"
import { DAANewSource, OEPNewSource } from "./utils/newFetching/newSources"
import { removeDayTime } from "./utils/newFetching/removeDayTime"
import { shortenText } from "./utils/shortenText"

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
  const [deadlineMonth, setDeadlineMonth] = useState(0)

  useEffect(() => {
    setNewsFromStorage()
  }, [])

  useEffect(() => {
    onNewTypeChange(currentNewType)
  }, [currentNewType])

  useEffect(() => {
    onNewSourceChange(currentNewsSource)
  }, [currentNewsSource])

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

  const afterSuccessfulLogin = async () => {
    setIsLoggedIn(true)
    //Todo: fetch deadlines
  }
  const afterSuccessfulLogout = async () => {
    setIsLoggedIn(false)
  }
  return (
    <div className="popup-container">
      <div className="popup-header">Ezuit</div>
      <div className="popup-content">
        <div className="deadlines-header">
          <span>Deadlines</span>

          {isLoggedIn && (
            <LogoutFromCourseButton
              afterLogout={afterSuccessfulLogout}
              storage={storage}
            />
          )}
        </div>
        <div className="deadlines-container">
          {isLoggedIn ? (
            <>
              {deadlines.length > 0 ? (
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
