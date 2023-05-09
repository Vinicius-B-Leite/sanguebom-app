import { api, baseURL } from ".";
import { NotificationType } from "../types/NotificationType";


type Props = {
    uid: string,
    token: string
}
export async function getNotification({ token, uid }: Props) {
    const response = await api.get<NotificationType[]>(baseURL + 'notification?uid=' + uid, { headers: { Authorization: 'Bearer ' + token } });
    return response.data;
}