const fetchDaaNews = async () => {
  const parser = new DOMParser()
  const text = await fetch("https://student.uit.edu.vn/", {
    method: "GET"
  }).then((res) => res.text())

  const doc = parser.parseFromString(text, "text/html")
  //view-hien-thi-bai-viet-moi -> view-content -> item-list -> extract li from ul
  const viewContent = doc.querySelector(
    ".view-hien-thi-bai-viet-moi .view-content"
  )
  const itemList = viewContent?.querySelector(".item-list")
  const list = itemList?.querySelectorAll("li")
  const news = []
  //Return an array of new in the format : link - content
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    news.push({ link, title })
  })
  return news
}

export { fetchDaaNews }
