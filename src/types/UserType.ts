import { GenderType } from "./GenderType"

export type UserType = {
    uid: string,
    email: string,
    password: string,
    username: string,
    type: string,
    token: string,
    imageURL?: string | null,
    adress?: string,
    gender?: GenderType
    bloodType?: string
}