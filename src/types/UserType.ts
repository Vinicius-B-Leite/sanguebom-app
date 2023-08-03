import { GenderType } from "./GenderType"

export type UserType = {
    uid: string,
    email: string,
    password: string,
    username: string,
    type: 'bloodCollectors' | 'donors',
    token: string,
    imageURL?: string | null,
    adress?: string,
    gender?: GenderType
    bloodType?: string,
    phoneNumber?: string
}