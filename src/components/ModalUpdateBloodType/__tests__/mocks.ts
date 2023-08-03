import { UserType } from "../../../types/UserType"



const fakeUser: UserType = {
    email: 'user.email',
    password: 'user.password',
    token: 'user.token',
    type: 'donors',
    uid: 'user.uid',
    username: 'user.username',
    bloodType: 'O+',
    gender: 'female',
}
const fakeUserBloodCollector: UserType = {
    ...fakeUser,
    type: 'bloodCollectors'
}



export const mocks = {
    fakeUser,
    fakeUserBloodCollector
}