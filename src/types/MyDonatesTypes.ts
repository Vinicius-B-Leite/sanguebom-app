import { HospitalType } from "./HospitalType"
import { UserType } from "./UserType"

export type Donate = {
    id: string,
    date: Date,
    userID: string,
    bloodCollectoID: string,
    bloodCollectors: HospitalType,
    users: UserType
}

export type MyDonatesTypes = {
    donates: Donate[],
    waitDaysToDonate: number
}