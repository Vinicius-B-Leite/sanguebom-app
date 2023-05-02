import { UserType } from '../types/UserType'
import { api } from './index'


type Props = {
    email: string,
    password: string
}


export async function login({ email, password }: Props) {
    return await api.post<UserType>('auth/login', { email, password })
}