export type UserType = {
    email: string,
    password: string,
    bloodType: string
    token: string,
    uid: string,
    username: string,
    type: 'normal user' | 'blood collectors',
    imageURL: string | null,
    adress?: string
}