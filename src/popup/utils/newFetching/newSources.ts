import { Storage } from "@plasmohq/storage"

import type { NewSource } from "~src/types"

import {
  getDaaChinhQuy,
  getDaaThongBaoChung,
  getDaaThongBaoNghiBu,
  getDaaThongBaoVePhongHoc,
  getDaaVanBang2
} from "./DaaUtils"

const storage = new Storage({ area: "local" })
export const DAANewSource: NewSource = {
  name: "DAA",
  source: "https://daa.uit.edu.vn/",
  sectionOptions: [
    "Thong bao chung",
    "Thong bao van bang 2",
    "Thong bao chinh quy",
    "Thong bao nghi bu",
    "Thong bao ve phong hoc"
  ],
  fetch: async () => {
    const parser = new DOMParser()
    const text = await fetch("https://daa.uit.edu.vn//", {
      method: "GET"
    }).then((res) => res.text())

    const doc = parser.parseFromString(text, "text/html")
    const thongBaoChung = getDaaThongBaoChung(doc)
    const thongBaoVanBang2 = getDaaVanBang2(doc)
    const thongBaoChinhQuy = getDaaChinhQuy(doc)
    const thongBaoNghiBu = getDaaThongBaoNghiBu(doc)
    const thongBaoVePhongHoc = getDaaThongBaoVePhongHoc(doc)
    const newObject = {
      "Thong bao chung": thongBaoChung,
      "Thong bao van bang 2": thongBaoVanBang2,
      "Thong bao chinh quy": thongBaoChinhQuy,
      "Thong bao nghi bu": thongBaoNghiBu,
      "Thong bao ve phong hoc": thongBaoVePhongHoc
    }
    await storage.set("DAANews", { ...newObject })
    return newObject
  },
  fetchFromStorage: async () => {
    return await storage.get("DAANews")
  },
  cleanStorage: async () => {
    return await storage.removeItem("DAANews")
  }
}
