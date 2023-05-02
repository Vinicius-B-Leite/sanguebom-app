import { api } from ".";
import { HospitalType } from "../types/HospitalType";


type Props = {
    bloodCollectorName?: string,
    token: string
}
export async function getBloodCollectors({ token, bloodCollectorName }: Props) {
    let url = 'bloodcollectors/'

    if (bloodCollectorName && bloodCollectorName?.length > 0) {
        url += `?name=${bloodCollectorName} `
    }

    return (await api.get<HospitalType[]>(url, { headers: { Authorization: 'Bearer ' + token } })).data
}