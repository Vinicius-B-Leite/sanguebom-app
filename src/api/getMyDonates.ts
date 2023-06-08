import { api, baseURL } from ".";
import { MyDonatesTypes } from "../types/MyDonatesTypes";


type Props = {
    uid: string,
}
export async function getMyDonates({ uid }: Props) {
    const response = await api.get<MyDonatesTypes>(`${baseURL}donate?userid=${uid}`);
    return response.data;
}