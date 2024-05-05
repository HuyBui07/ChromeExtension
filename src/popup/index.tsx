import { useEffect, useState } from "react"

import "./index.css"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import RefreshIcon from "~assets/refresh"

import themes from "../constants/colorThemes"
import { fetchDaaNews } from "./utils/newFetching/fetchDaaNews"
import { shortenText } from "./utils/shortenText"

const MAX_NEWS_ITEMS = 5
interface NewsItem {
  link: string
  title: string
}

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
  useEffect(() => {
    setFromStorage()
  }, [])

  const setFromStorage = async () => {
    const news = (await storage.get("daaNews")) as NewsItem[]
    setNews(news)
  }
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
  const requestRefreshStudentNew = async () => {
    setIsFetchingNews(true)
    const news: NewsItem[] = await fetchDaaNews()
    setNews(news)
    await storage.set("daaNews", news)
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
                <a href={item.link} target="_blank">
                  {shortenText(item.title, 30)}
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
