import { NotificationType } from "src/types/NotificationType"
import { LAST_NOTIFICATION_KEY, NOTIFICATIONS_KEY, storage } from "./storageConfig"

export const setLastNotificationRead = (notifcationID: string) => {
    storage.set(LAST_NOTIFICATION_KEY, notifcationID)
}

export const setNotificationsStorage = (notifications: NotificationType[]) => {
    storage.set(NOTIFICATIONS_KEY, JSON.stringify(notifications))
}

export const getNotificationsStorage = () => {
    const storageResponse = storage.getString(NOTIFICATIONS_KEY)
    const notifications = storageResponse ? JSON.parse(storageResponse) as NotificationType[] : null

    return notifications
}