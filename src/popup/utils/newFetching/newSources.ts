import { Storage } from "@plasmohq/storage"

import type { NewSource } from "~src/types"

import {
  getDaaChinhQuy,
  getDaaThongBaoChung,
  getDaaThongBaoNghiBu,
  getDaaThongBaoVePhongHoc,
  getDaaVanBang2
} from "./DaaUtils"
import {
  getOEPChuongTrinhCLC,
  getOEPChuongTrinhLienKet,
  getOEPChuongTrinhTaiNang,
  getOEPChuongTrinhTienTien,
  getOEPThongBaoChung,
  getOEPThongBaoNghiHocBu
} from "./OepUtils"

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

export const OEPNewSource: NewSource = {
  name: "OEP",
  source: "https://oep.uit.edu.vn/",
  sectionOptions: [
    "Thong bao chung",
    "Thong bao nghi, hoc bu",
    "Chuong trinh CLC",
    "Chuong trinh tien tien",
    "Chuong trinh tai nang",
    "Chuong trinh lien ket"
  ],
  fetch: async () => {
    const parser = new DOMParser()
    const text = await fetch("https://oep.uit.edu.vn/", {
      method: "GET"
    }).then((res) => res.text())
    const doc = parser.parseFromString(text, "text/html")
    const thongBaoChung = getOEPThongBaoChung(doc)
    const thongBaoNghiHocBu = getOEPThongBaoNghiHocBu(doc)
    const chuongTrinhCLC = getOEPChuongTrinhCLC(doc)
    const chuongTrinhTaiNang = getOEPChuongTrinhTaiNang(doc)
    const chuongTrinhTienTien = getOEPChuongTrinhTienTien(doc)
    const chuongTrinhLienKet = getOEPChuongTrinhLienKet(doc)
    console.log("Thong bao chung", thongBaoChung)
    console.log("Thong bao nghi hoc bu", thongBaoNghiHocBu)
    console.log("Chuong trinh CLC", chuongTrinhCLC)
    console.log("Chuong trinh tai nang", chuongTrinhTaiNang)
    console.log("Chuong trinh tien tien", chuongTrinhTienTien)
    console.log("Chuong trinh lien ket", chuongTrinhLienKet)
    const newObject = {
      "Thong bao chung": thongBaoChung,
      "Thong bao nghi, hoc bu": thongBaoNghiHocBu,
      "Chuong trinh CLC": chuongTrinhCLC,
      "Chuong trinh tien tien": chuongTrinhTienTien,
      "Chuong trinh tai nang": chuongTrinhTaiNang,
      "Chuong trinh lien ket": chuongTrinhLienKet
    }
    await storage.set("OEPNews", { ...newObject })
    return newObject
  },
  fetchFromStorage: async () => {
    return await storage.get("OEPNews")
  },
  cleanStorage: async () => {
    return await storage.removeItem("OEPNews")
  }
}
