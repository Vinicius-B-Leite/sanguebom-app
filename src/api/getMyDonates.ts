import { api, baseURL } from ".";
import { MyDonatesTypes } from "../types/MyDonatesTypes";


type Props = {
    uid: string,
}
export async function getMyDonates({ uid }: Props) {
    return (await api.get<MyDonatesTypes>(`${baseURL}donate?userid=${uid}`)).data;
}