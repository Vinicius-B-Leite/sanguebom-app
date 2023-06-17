import { UserType } from '../types/UserType'
import { api } from './index'


type Props = {
    email: string,
    password: string
}
type Response = {
    bloodCollectors: {
        adress: string,
        imageURL: string,
        phoneNumber: string,
        uid: string,
        userEmail: string
    } | null,
    donors: {
        bloodType: string,
        gender: string,
        uid: string,
        userEmail: string
    } | null,
    email: string,
    password: string,
    token: string,
    type: 'bloodCollectors' | 'donors',
    username: string
}

export async function login({ email, password }: Props) {
    return await api.post<Response>('auth/login', { email: email.toLocaleLowerCase(), password })
}