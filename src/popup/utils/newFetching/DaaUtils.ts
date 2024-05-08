const getDaaThongBaoChung = (doc: Document) => {
  const viewContent = doc.querySelector(
    ".view-hien-thi-bai-viet-moi .view-content"
  )
  const itemList = viewContent?.querySelector(".item-list")
  const list = itemList?.querySelectorAll("li")
  const thongBaoChung = []

  //Get the link and content then convert to NewsItem format
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    //The text after a is the datePosted. Remove space . The format is DD/MM/YYYY-HH:MM
    const datePosted = a?.nextSibling?.textContent
      ?.replace(/\s/g, "")
      .replace("-", "")
    thongBaoChung.push({ link, title, datePosted })
  })
  return thongBaoChung
}
const getDaaVanBang2 = (doc: Document) => {
  //Thong bao vang bang 2
  // #block-views-hien-thi-bai-viet-moi-block-1 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector(
    "#block-views-hien-thi-bai-viet-moi-block-1"
  )
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const thongBaoVanBang2 = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextSibling?.textContent
      ?.replace(/\s/g, "")
      .replace("-", "")
    thongBaoVanBang2.push({ link, title, datePosted })
  })
  return thongBaoVanBang2
}

const getDaaChinhQuy = (doc: Document) => {
  //Thong bao chinh quy
  // #block-views-hien-thi-bai-viet-moi-block-2 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector(
    "#block-views-hien-thi-bai-viet-moi-block-2"
  )
  const content = blockViews?.querySelector(".content")

  const list = content?.querySelectorAll(".item-list li")
  const thongBaoChinhQuy = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextSibling?.textContent
      ?.replace(/\s/g, "")
      .replace("-", "")
    thongBaoChinhQuy.push({ link, title, datePosted })
  })
  return thongBaoChinhQuy
}

const getDaaThongBaoNghiBu = (doc: Document) => {
  //Thong bao nghi bu
  //#block-views-thongbao-baonghi-baobu-block -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector(
    "#block-views-thongbao-baonghi-baobu-block"
  )
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const thongBaoNghiBu = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextSibling?.textContent
      ?.replace(/\s/g, "")
      .replace("-", "")
    thongBaoNghiBu.push({ link, title, datePosted })
  })
  return thongBaoNghiBu
}

const getDaaThongBaoVePhongHoc = (doc: Document) => {
  //Thong bao ve phong hoc
  //#block-views-thongbao-baonghi-baobu-block-1 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector(
    "#block-views-thongbao-baonghi-baobu-block-1"
  )
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const thongBaoVePhongHoc = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextSibling?.textContent
      ?.replace(/\s/g, "")
      .replace("-", "")
    thongBaoVePhongHoc.push({ link, title, datePosted })
  })
  return thongBaoVePhongHoc
}
export {
  getDaaThongBaoChung,
  getDaaVanBang2,
  getDaaChinhQuy,
  getDaaThongBaoNghiBu,
  getDaaThongBaoVePhongHoc
}
