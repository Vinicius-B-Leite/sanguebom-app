import { GenderType } from "../../../types/GenderType"
import { NotificationType } from "../../../types/NotificationType"
import { UserType } from "../../../types/UserType"

const fakeStorageNotifications: NotificationType[] = [
    {
        description: 'storageNotification.description',
        id: 'storageNotification.id1',
        title: 'storageNotification.title1',
        type: 'post',
        userUID: 'storageNotification.userUID',
        postID: 'storageNotification.postID',
    },
]
const fakeApiNotifications: NotificationType[] = [
    {
        description: 'onlineNotification.description',
        id: 'onlineNotification.id1',
        title: 'onlineNotification.title1',
        type: 'post',
        userUID: 'onlineNotification.userUID',
        postID: 'onlineNotification.postID', 
    }
]
const fakeUser: UserType = {
    uid: "123123123",
    email: 'email',
    password: "23123",
    token: '11111',
    type: 'donors',
    username: 'username',
    bloodType: 'A+',
    gender: 'male' as GenderType
}
export const mocks = {
    fakeStorageNotifications,
    fakeUser,
    fakeApiNotifications
}