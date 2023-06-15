import AsyncStorage from "@react-native-async-storage/async-storage"
import { THEME_KEY, storage } from "./storageConfig"



type Theme = 'dark' | 'light'

export const getStorageTheme = () => {
    const res = storage.getString(THEME_KEY)
    const theme = res ? res as Theme : null
    return theme
}

export const changeStorageTheme = (theme: Theme) => {
    storage.set(THEME_KEY, theme)
}