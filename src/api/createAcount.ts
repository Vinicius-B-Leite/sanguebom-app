import { UserType } from '../types/UserType'
import { api } from './index'


type Props = {
    email: string,
    bloodType: string,
    username: string,
    password: string
}


export async function createAccount({ bloodType, email, password, username }: Props) {
    return await api.post<UserType>('auth/create', { bloodType, email: email.toLocaleLowerCase(), password, username })
}