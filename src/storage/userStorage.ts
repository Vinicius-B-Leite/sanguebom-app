import { USER_KEY, storage } from "./storageConfig"
import { UserType } from "../types/UserType"

export const getStorageUser = () => {
    const res = storage.getString(USER_KEY)
    const user = res ? JSON.parse(res) as UserType : null

    return user
}

export const updateStorageUser = (newUser: UserType) => {
    storage.set(USER_KEY, JSON.stringify(newUser))
}

export const removeStorageUser = () => {
    storage.delete(USER_KEY)
}