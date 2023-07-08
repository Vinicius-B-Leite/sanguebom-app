import { getLastNotificationRead, getNotificationsStorage, setLastNotificationRead, setNotificationsStorage } from "../notificationStorage";
import { NotificationType } from '../../types/NotificationType'
import { getStorageUser, removeStorageUser, updateStorageUser } from '../userStorage'
import { getPostsStorage, setPostsStorage } from '../postsStorage'
import { UserType } from "../../types/UserType";
import { storage } from "../storageConfig";
import { PostType } from '../../types/PostType'
import { HospitalType } from "../../types/HospitalType";
import { getQuestionsStorage, setQuestionsStorage } from '../questionsStorage'
import { changeStorageTheme, getStorageTheme } from '../themeStorage'



const fakeUser: UserType = {
    email: 'user.email',
    password: 'user.password',
    token: 'user.token',
    type: 'user.type',
    uid: 'user.uid',
    username: 'user.username'
}
const fakeBloodCollector: HospitalType = { ...fakeUser, alert: null, lat: 213, lng: 214, phoneNumber: '' } as HospitalType
const fakePosts: PostType[] = [{
    adress: 'post.adress',
    bannerURL: 'post.bannerURL',
    bloodCollectors: fakeBloodCollector,
    bloodCollectorsID: 'post.bloodCollectorsID',
    createdAt: new Date(),
    description: 'post.description',
    id: 'post.id',
    linkRedirect: 'post.linkRedirect',
}]



describe('Storage', () => {

    beforeAll(() => {
        storage.clearAll()
    })
    describe('Notifications', () => {
        describe('Last notification', () => {
            it('returned a empty string when nothing was storage', () => {
                const id = getLastNotificationRead()
                expect(id).toBe('')
            })

            it('saved the notificationID passed in parameters', () => {
                setLastNotificationRead('notifcationID')

                const newNotifcationID = getLastNotificationRead()
                expect(newNotifcationID).toBe('notifcationID')
            })

            it('returned a notificationID  when it was storage', () => {
                const id = getLastNotificationRead()
                expect(id).toBe('notifcationID')
            })
        })

        describe('Offline notifcations', () => {
            const fakeNotifications: NotificationType[] = [
                {
                    description: 'notification.desc',
                    id: 'notification.id',
                    title: 'notification.title',
                    type: 'alert',
                    userUID: 'notification.userUID',
                    postID: 'notification.postID'
                }
            ]
            it('returned null when nothing was storage', () => {
                const notification = getNotificationsStorage()
                expect(notification).toBeNull()
            })

            it('saved the notifications passed in parameters', () => {

                setNotificationsStorage(fakeNotifications)

                const notifcations = getNotificationsStorage()
                expect(notifcations).toStrictEqual(fakeNotifications)
            })

            it('returned a notifications  when it was storage', () => {
                const notifcations = getNotificationsStorage()
                expect(notifcations).toStrictEqual(fakeNotifications)

            })
        })
    })

    describe('User', () => {
        describe('getStorageUser', () => {
            it('returned null when storage was cleaned', () => {
                const user = getStorageUser()

                expect(user).toBeNull()
            })

            it('returned logged user', () => {
                updateStorageUser(fakeUser)
                const user = getStorageUser()

                expect(user).toEqual(fakeUser)
            })

            it('deleted logged user', () => {
                removeStorageUser()

                const user = getStorageUser()

                expect(user).toBeNull()
            })
        })
    })

    describe('Posts', () => {
        describe('getPostsStorage', () => {
            it('returned null when posts DID NOT exist', () => {
                const posts = getPostsStorage()

                expect(posts).toBeNull()
            })
            it('returned posts in storage', () => {
                setPostsStorage(fakePosts)
                const posts = getPostsStorage()

                expect(posts).not.toBeNull()
            })
        })
        describe('setPostsStorage', () => {
            it('returned offline posts', () => {
                setPostsStorage(fakePosts)
                const posts = getPostsStorage()

                expect(posts).not.toBeNull()
            })
        })
    })
    describe('Questions', () => {
        describe('getQuestionsStorage', () => {
            it('returned null when questions DID NOT exist', () => {
                const questions = getQuestionsStorage()

                expect(questions).toBeNull()
            })
            it('returned questions in storage', () => {
                setQuestionsStorage([{ answare: 'answare', questions: 'question', id: '123123' }])
                const questions = getQuestionsStorage()

                expect(questions).not.toBeNull()
            })
        })
        describe('setQuestionsStorage', () => {
            it('returned offline questions', () => {
                setQuestionsStorage([{ answare: 'answare', questions: 'question', id: '123123' }])
                const questions = getQuestionsStorage()

                expect(questions).not.toBeNull()
            })
        })
    })

    describe('Theme', () => {
        describe('getStorageTheme', () => {
            it('returned null if DID NOT existÜ', () => {
                const theme = getStorageTheme()

                expect(theme).toBeNull()
            })
        })
        describe('getStorageTheme', () => {
            it('returned null if DID NOT existÜ', () => {
                changeStorageTheme('dark')
                const theme = getStorageTheme()

                expect(theme).toBe('dark')
            })
        })
    })
})