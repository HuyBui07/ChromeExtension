export const getOEPThongBaoChung = (doc: Document) => {
  //Thong bao chung
  //#block-views-panel-views-block-7 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-7")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const thongBaoChung = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    //date is inside a span with class name "date" next to the a tag. Simply extract the text and remove ( & ) characters
    const datePosted = a?.nextElementSibling?.textContent
      ?.replace("( ", "")
      .replace(" )", "")
    thongBaoChung.push({ link, title, datePosted })
  })
  return thongBaoChung
}
export const getOEPThongBaoNghiHocBu = (doc: Document) => {
  //Thong bao nghi hoc bu
  //#block-views-panel-views-block-13 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-13")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const thongBaoNghiHocBu = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText

    const datePosted = a?.nextElementSibling?.textContent

    thongBaoNghiHocBu.push({ link, title, datePosted })
  })
  return thongBaoNghiHocBu
}
export const getOEPChuongTrinhCLC = (doc: Document) => {
  //Chuong trinh CLC
  //#block-views-panel-views-block-8 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-8")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const chuongTrinhCLC = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextElementSibling?.textContent

    chuongTrinhCLC.push({ link, title, datePosted })
  })
  return chuongTrinhCLC
}
export const getOEPChuongTrinhTienTien = (doc: Document) => {
  //Chuong trinh tien tien
  //#block-views-panel-views-block-9 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-9")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const chuongTrinhTienTien = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextElementSibling?.textContent

    chuongTrinhTienTien.push({ link, title, datePosted })
  })
  return chuongTrinhTienTien
}
export const getOEPChuongTrinhTaiNang = (doc: Document) => {
  //Chuong trinh tai nang
  //#block-views-panel-views-block-10 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-10")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const chuongTrinhTaiNang = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextElementSibling?.textContent

    chuongTrinhTaiNang.push({ link, title, datePosted })
  })
  return chuongTrinhTaiNang
}
export const getOEPChuongTrinhLienKet = (doc: Document) => {
  //Chuong trinh lien ket
  //#block-views-panel-views-block-11 -> content -> item-list -> extract li from ul
  const blockViews = doc.querySelector("#block-views-panel-views-block-11")
  const content = blockViews?.querySelector(".content")
  const list = content?.querySelectorAll(".item-list li")
  const chuongTrinhLienKet = []
  list?.forEach((li) => {
    const a = li.querySelector("a")
    const link = a?.getAttribute("href")
    const title = a?.innerText
    const datePosted = a?.nextSibling?.textContent

    chuongTrinhLienKet.push({ link, title, datePosted })
  })
  return chuongTrinhLienKet
}
