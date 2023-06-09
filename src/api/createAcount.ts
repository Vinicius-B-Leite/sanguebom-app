import { UserType } from '../types/UserType'
import { api } from './index'


type Props = {
    email: string,
    bloodType: string,
    username: string,
    password: string,
    gender: string
}


export async function createAccount({ bloodType, email, password, username, gender }: Props) {
    return await api.post<UserType>('auth/create', { bloodType, email: email.toLocaleLowerCase(), password, username, gender })
}