import { AuthResponse } from "../../../api/login"

const userCreated: AuthResponse = {
    donors: {
        bloodType: 'A+',
        gender: 'female',
        uid: '123213',
        userEmail: 'user@gmail.com'
    },
    email: 'user@gmail.com',
    password: '123123',
    token: '123123',
    type: 'donors',
    username: 'username',
    bloodCollectors: null
}

export const mocks = {
    userCreated
}