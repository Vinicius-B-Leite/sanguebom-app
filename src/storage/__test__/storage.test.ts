import { getLastNotificationRead, getNotificationsStorage, setLastNotificationRead, setNotificationsStorage } from "../notificationStorage";
import { NotificationType } from '../../types/NotificationType'




describe('Storage', () => {

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