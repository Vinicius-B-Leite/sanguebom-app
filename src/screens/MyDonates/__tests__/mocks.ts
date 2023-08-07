import { MyDonatesTypes } from "../../../types/MyDonatesTypes";
import { UserType } from "../../../types/UserType";

const fakeUser: UserType = {
    email: 'user.email',
    password: 'user.password',
    token: 'user.token',
    type: 'donors',
    uid: 'user.uid',
    username: 'user.username',
}
const fakeDonatesWithWaitDaysToDonate: MyDonatesTypes = {
    donates: [
        {
            bloodCollectoID: 'bloodCollectors.123123',
            bloodCollectors: {
                uid: 'bloodCollectors.123123',
                adress: 'bloodCollectors.adress',
                alert: null,
                email: 'bloodCollectors.email',
                imageURL: 'bloodCollectors.imageurl',
                lat: 123,
                lng: 123,
                phoneNumber: 'bloodCollectors.phoneNumber',
                username: 'bloodCollectors.ername',
                users: {
                    username: 'bloodCollectors.ername'
                }
            },
            date: new Date(),
            id: 'donate.id1',
            userID: 'user.id',
            users: fakeUser
        }
    ],
    waitDaysToDonate: 60
}


const lastYear = new Date()
lastYear.setFullYear(new Date().getFullYear() - 1)
const fakeDonatesWith0DaysToWait: MyDonatesTypes = {
    ...fakeDonatesWithWaitDaysToDonate,
    waitDaysToDonate: -1,
    donates: [
        ...fakeDonatesWithWaitDaysToDonate.donates,
        {
            ...fakeDonatesWithWaitDaysToDonate.donates[0],
            date: lastYear
        }
    ]
}

export const mocks = {
    fakeDonatesWithWaitDaysToDonate,
    fakeUser,
    fakeDonatesWith0DaysToWait
}