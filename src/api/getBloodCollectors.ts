import { api } from ".";
import { HospitalType } from "../types/HospitalType";




export async function getBloodCollectors(bloodCollectorName?: string ) {
    let url = 'bloodcollectors/'

    if (bloodCollectorName && bloodCollectorName?.length > 0) {
        url += `?name=${bloodCollectorName} `
    }

    return (await api.get<HospitalType[]>(url)).data
}