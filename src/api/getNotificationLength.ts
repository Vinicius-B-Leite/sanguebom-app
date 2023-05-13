import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "."


type Props = {
    token: string,
    uid: string,
}

export async function getNotificationLength({ token, uid }: Props) {
    const lastedNotificationReadID = await AsyncStorage.getItem('@lastedNotificationReadID')
    return (await api.get<number>(`notificationlength?uid=${uid}&lastedread=${lastedNotificationReadID || ''}`, { headers: { Authorization: 'Bearer ' + token } })).data
}