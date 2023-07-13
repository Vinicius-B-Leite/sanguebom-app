import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import NotificationItem from '../index'
import { NotificationType } from "../../../types/NotificationType";
import { act, fireEvent } from "@testing-library/react-native";


const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockedNavigate
    })
}));

const fakeAlertNotification: NotificationType = {
    description: 'notification.description',
    id: 'notification.id',
    title: 'notification.title',
    type: 'alert',
    userUID: 'notification.userUID',
}
const fakePostNotification: NotificationType = {
    description: 'notification.description',
    id: 'notification.id',
    title: 'notification.title',
    type: 'post',
    userUID: 'notification.userUID',
    postID: 'notification.postID'
}
describe('NotificationItem', () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
    });
    it('rendered', () => {
        const { getByText } = renderWithProviders(<NotificationItem notification={fakeAlertNotification} />)

        expect(getByText(fakeAlertNotification.title)).toBeTruthy()
    })
    it('if notification.type == "alert" should openned/closed when notificationContainer was pressed', async () => {
        const { getByTestId, findByText } = renderWithProviders(<NotificationItem notification={fakeAlertNotification} />)

        const notificationContainer = getByTestId('notificationContainer')
        act(() => {
            fireEvent(notificationContainer, 'press')
        })

        const description = await findByText(fakeAlertNotification.description)

        expect(description).toBeTruthy()
    })

    it('navigated when notificationContainer was pressed and notification.type == "post"', () => {



        const { getByTestId } = renderWithProviders(<NotificationItem notification={fakePostNotification} />)

        const notificationContainer = getByTestId('notificationContainer')
        console.log("🚀 ~ file: NotificationItem.test.tsx:53 ~ it ~ notificationContainer:", notificationContainer)
        fireEvent.press(notificationContainer)


        expect(mockedNavigate).toHaveBeenCalledWith("Post", { "postID": fakePostNotification.postID })

    })
})