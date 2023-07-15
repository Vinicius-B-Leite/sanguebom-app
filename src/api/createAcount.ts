import { api } from './index'
import { AuthResponse } from './login'


type Props = {
    email: string,
    bloodType: string,
    username: string,
    password: string,
    gender: string
}



export async function createAccount({ bloodType, email, password, username, gender }: Props) {
    return await api.post<AuthResponse>(
        'auth/create',
        {
            bloodType,
            email: email.toLowerCase(),
            password,
            username,
            gender
        })

}