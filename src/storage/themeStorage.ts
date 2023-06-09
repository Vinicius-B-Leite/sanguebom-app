import AsyncStorage from "@react-native-async-storage/async-storage"
import { THEME_KEY } from "./storageConfig"



type Theme = 'dark' | 'light'

export const getStorageTheme = async () => {
    const res = await AsyncStorage.getItem(THEME_KEY)
    const theme = res ? res as Theme : null
    return theme
}

export const changeStorageTheme = async (theme: Theme) => {
    await AsyncStorage.setItem(THEME_KEY, theme)
}