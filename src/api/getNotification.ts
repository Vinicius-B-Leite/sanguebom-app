import { api, baseURL } from ".";
import { NotificationType } from "../types/NotificationType";


type Props = {
    uid: string,
}
export async function getNotification({ uid }: Props) {
    const response = await api.get<NotificationType[]>(baseURL + 'notification?uid=' + uid);
    return response.data;
}