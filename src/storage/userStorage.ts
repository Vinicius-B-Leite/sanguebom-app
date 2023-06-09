import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_KEY } from "./storageConfig"
import { UserType } from "../types/UserType"

export const getStorageUser = async () => {
    const res = await AsyncStorage.getItem(USER_KEY)
    const user = res ? JSON.parse(res) as UserType : null

    return user
}

export const updateStorageUser = async (newUser: UserType) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
}

export const removeStorageUser = async () => {
    await AsyncStorage.removeItem(USER_KEY)
}