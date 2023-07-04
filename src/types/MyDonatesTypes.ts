import { HospitalType } from "./HospitalType"
import { UserType } from "./UserType"

export type Donate = {
    id: string,
    date: Date,
    userID: string,
    bloodCollectoID: string,
    bloodCollectors: HospitalType & { users: { username: string } },
    users: UserType
}

export type MyDonatesTypes = {
    donates: Donate[],
    waitDaysToDonate: number
}