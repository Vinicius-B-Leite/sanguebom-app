import { api } from ".";
import { HospitalType } from "../types/HospitalType";


type Props = {
    bloodCollectorName?: string | null,
}
export async function getBloodCollectors({ bloodCollectorName }: Props) {
    let url = 'bloodcollectors/'

    if (bloodCollectorName && bloodCollectorName?.length > 0) {
        url += `?name=${bloodCollectorName} `
    }

    return (await api.get<HospitalType[]>(url)).data
}