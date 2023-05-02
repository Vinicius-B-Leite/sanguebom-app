import { AlertType } from "./AlertType"

export type HospitalType = {
    uid: string,
    imageURL: string,
    phoneNumber: string,
    adress: string,
    email: string,
    username: string,
    alert: null | AlertType,
    lat: number ,
    lng: number
}