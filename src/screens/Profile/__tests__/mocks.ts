import { UserType } from "../../../types/UserType";
import { GenderType } from "../../../types/GenderType";

const fakeUser: { user: UserType } = {
    user: {
        uid: "123123123",
        email: 'email',
        password: "23123",
        token: '11111',
        type: 'donors',
        username: 'username',
        bloodType: 'A+',
        gender: 'male' as GenderType
    }
}

const fakeBloodCollectorsUser: { user: UserType } = {
    user: {
        uid: "123123123",
        email: 'email',
        password: "23123",
        token: '11111',
        type: 'bloodCollectors',
        username: 'username',
        adress: 'bloodCollector.adress',
        imageURL: 'bloodCollector.imageURL',
        phoneNumber: 'bloodCollector.phoneNumber'
    }
}

const updateUserCredentialsResponse = {
    email: fakeUser.user.email,
    password: fakeUser.user.password,
    username: fakeUser.user.username,
    type: 'donors',
    donors: {
        uid: fakeUser.user.uid,
        bloodType: fakeUser.user.bloodType,
        gender: fakeUser.user.gender,
        userEmail: fakeUser.user.email
    }
}
const updateBloodCollectorCredentialsResponse = {
    email: fakeBloodCollectorsUser.user.email,
    password: fakeBloodCollectorsUser.user.password,
    username: fakeBloodCollectorsUser.user.username,
    type: 'bloodCollectors',
    bloodCollectors: {
        uid: fakeBloodCollectorsUser.user.uid,
        imageURL: fakeBloodCollectorsUser.user.imageURL,
        phoneNumber: fakeBloodCollectorsUser.user.phoneNumber,
        adress: fakeBloodCollectorsUser.user.adress,
        userEmail: fakeBloodCollectorsUser.user.email
    }
}




export const mocks = {
    fakeUser,
    fakeBloodCollectorsUser,
    updateUserCredentialsResponse,
    updateBloodCollectorCredentialsResponse
}