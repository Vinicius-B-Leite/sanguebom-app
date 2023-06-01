import { api, baseURL } from ".";
import { MyDonatesTypes } from "../types/MyDonatesTypes";


type Props = {
    uid: string,
    token: string
}
export async function getMyDonates({ token, uid }: Props) {
    const response = await api.get<MyDonatesTypes>(`${baseURL}donate?userid=${uid}`, { headers: { Authorization: 'Bearer ' + token } });
    return response.data;
}