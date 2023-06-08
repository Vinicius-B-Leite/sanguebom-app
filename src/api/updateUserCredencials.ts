import { api } from ".";
import { UserType } from "../types/UserType";

export type UpdateUserCredencialsProps = {
    email: string,
    password: string,
    bloodType?: string,
    phoneNumber?: string,
    username: string,
    adress?: string,
    uid: string,
    avatar?: { name: string, uri: string, type: string },
}

export async function updateUserCredencials({ adress, avatar, bloodType, email, password, phoneNumber, uid, username }: UpdateUserCredencialsProps) {

    const form = new FormData()

    form.append('email', email)
    form.append('password', password)
    form.append('username', username)
    form.append('uid', uid)

    if (bloodType) {
        form.append('bloodType', bloodType)
    }
    if (phoneNumber) {
        form.append('phoneNumber', phoneNumber)
    }
    if (adress) {
        form.append('adress', adress)
    }
    if (avatar) {
        const ext = avatar.uri.substring(avatar.uri.lastIndexOf('.') + 1)
        const formFile = {
            name: avatar.name + '.' + ext,
            uri: avatar.uri,
            type: avatar.type + '/' + ext,
        } as any
        form.append('avatar', formFile)
    }






    return (await api.put<UserType>(
        'auth/update',
        form,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })).data
}