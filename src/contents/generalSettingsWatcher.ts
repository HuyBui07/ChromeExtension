import { Storage } from "@plasmohq/storage"

const SettingWatcher = new Storage({
  area: "local"
})
//Export storage as SettingsWatcher

export default SettingWatcher
