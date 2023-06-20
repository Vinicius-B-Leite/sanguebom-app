import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "."
import { getLastNotificationRead } from '../storage/notificationStorage'


type Props = {
    uid: string,
}

export async function getNotificationLength({ uid }: Props) {
    const lastedNotificationReadID = getLastNotificationRead()
    return (await api.get<number>(`notificationlength?uid=${uid}&lastedread=${lastedNotificationReadID}`)).data
}