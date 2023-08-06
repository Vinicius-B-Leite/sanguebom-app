import { HospitalType } from "../../../types/HospitalType"
import { GenderType } from "../../../types/GenderType"
import { UserType } from "../../../types/UserType"

const fakeBloodCollector: HospitalType = {
    username: 'fakeBloodCollector.name',
    email: 'fakeBloodCollector.email@gmail.com',
    adress: 'fakeBloodCollector.adress',
    alert: {
        bloodCollectorsID: 'fakeBloodCollector.uid',
        bloodTypes: ['A+'],
        id: 'alert.ID',
        status: true
    },
    imageURL: 'fakeBloodCollector.imageURL',
    lat: 123123,
    lng: 123123,
    phoneNumber: 'fakeBloodCollector.phoneNumber',
    uid: 'fakeBloodCollector.uid'
}
const fakeUserBloodCollector: UserType = {
    uid: 'fakeBloodCollector.uid',
    imageURL: 'fakeBloodCollector.imageURL',
    phoneNumber: 'fakeBloodCollector.phoneNumber',
    adress: 'fakeBloodCollector.adress',
    email: 'fakeBloodCollector.email',
    password: 'fakeBloodCollector.password',
    token: 'fakeBloodCollector.token',
    type: 'bloodCollectors',
    username: 'fakeBloodCollector.username',
}
const fakeUser = {
    user: {
        uid: "123123123",
        email: 'email',
        password: "23123",
        token: '11111',
        type: 'donors',
        username: 'username',
        bloodType: 'A+',
        gender: 'male' as GenderType
    } as UserType
}
export const fakeBloodCollectorList = [
    fakeBloodCollector,
    {
        ...fakeBloodCollector,
        username: 'fakeBloodCollectorList.name1'
    },
    {
        ...fakeBloodCollector,
        username: 'fakeBloodCollectorList.name2'
    },
    {
        ...fakeBloodCollector,
        username: 'fakeBloodCollectorList.name3'
    }
]
export const mocks = {
    fakeBloodCollector,
    fakeUser,
    fakeUserBloodCollector,
    fakeBloodCollectorList
}