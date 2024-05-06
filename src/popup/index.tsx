import { useEffect, useState } from "react"

import "./index.css"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import RefreshIcon from "~assets/refresh"
import type { NewsItem } from "~src/types"

import themes from "../constants/colorThemes"
import { DAANewSource } from "./utils/newFetching/newSources"
import { shortenText } from "./utils/shortenText"

const MAX_NEWS_ITEMS = 5
const TEXT_LIMIT = 30

function IndexPopup() {
  const storage = new Storage({ area: "local" })
  const [news, setNews] = useState([] as NewsItem[])
  const [isFetchingNews, setIsFetchingNews] = useState(false)
  const [currentPallette, setCurrentPallette, { setStoreValue }] = useStorage({
    key: "currentPallette",
    instance: storage
  })
  const storedThemeName =
    currentPallette && currentPallette.name ? currentPallette.name : "Default"
  //Todo: Implement source selection later for daa, student, oep

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
  useEffect(() => {
    setFromStorage()
  }, [])
  const setFromStorage = async () => {
    const news = await DAANewSource.fetchFromStorage()
    setNews(news["Thong bao van bang 2"])
  }

  const requestRefreshStudentNew = async () => {
    setIsFetchingNews(true)
    await DAANewSource.cleanStorage()
    const news: NewsItem[] = await DAANewSource.fetch().then(
      (news) => news["Thong bao van bang 2"]
    )
    // const news: NewsItem[] = await DAANewSource.fetchFromStorage().then(
    //   (news) => (news ? news["Thong bao chung"] : [])
    // )
    setNews(news)
    setIsFetchingNews(false)
  }
  return (
    <div className="popup-container">
      <div className="popup-header">Ezuit</div>
      <div className="theme-select-header">Select Theme</div>
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
        <div className="fetch-news-header">
          <span>News</span>
          <div
            style={{ width: "20px", height: "20px" }}
            onClick={requestRefreshStudentNew}>
            <RefreshIcon isLoading={isFetchingNews} />
          </div>
        </div>
        <div className="news-container">
          {news.length > 0 && !isFetchingNews ? (
            news.slice(0, MAX_NEWS_ITEMS).map((item) => (
              <div key={item.link} className="news-item">
                <a href={DAANewSource.source + item.link} target="_blank">
                  {shortenText(item.title, TEXT_LIMIT)}
                </a>
              </div>
            ))
          ) : (
            <div className="news-item news-status">
              {isFetchingNews ? "Fetching News..." : "No News"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
