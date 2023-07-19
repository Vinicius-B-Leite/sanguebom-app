import React from "react";
import { act, fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import Notification from '../index'
import * as apiService from '../../../api/getNotification'
import * as storageService from '../../../storage/notificationStorage'
import { mocks } from './mocks'




const renderWithInitialUser = () => renderWithProviders(<Notification />, {
    preloadedState: {
        user: {
            user: mocks.fakeUser
        }
    }
})


const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: mockGoBack
    })
}))

describe('Notification', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.spyOn(apiService, 'getNotification').mockResolvedValue(mocks.fakeApiNotifications)
    })
    it('rendered', async () => {

        const { findByText } = renderWithInitialUser()

        expect(await findByText(/Notificações/i)).toBeTruthy()
    })
    it('showed api notification when it has succesed in request', async () => {

        const { findByText } = renderWithInitialUser()
        expect(await findByText(mocks.fakeApiNotifications[0].title)).toBeTruthy()

    })
    it('went back to home when click on header', async () => {
        const { getByTestId } = renderWithInitialUser()

        const arrowIcon = getByTestId('arrow-icon')
        fireEvent(arrowIcon, 'press')

        expect(mockGoBack).toHaveBeenCalled()
    })
    it('saved last notification read id in storage', async () => {

        renderWithInitialUser()

        const lastNotificationIdRead = storageService.getLastNotificationRead()

        expect(lastNotificationIdRead).toBe(mocks.fakeApiNotifications[0].id)
    })
    it('saved all notifications in storage', async () => {

        renderWithInitialUser()

        const storageNotifications = storageService.getNotificationsStorage()

        expect(storageNotifications).toEqual(mocks.fakeApiNotifications)
    })
    it('got offline notifications when promise returned "Network Erro"', async () => {
        jest.spyOn(apiService, 'getNotification').mockRejectedValue({ message: 'Network Error' })
        jest.spyOn(storageService, 'getNotificationsStorage').mockReturnValue(mocks.fakeStorageNotifications)


        const { findByText } = renderWithInitialUser()

        expect(await findByText(mocks.fakeStorageNotifications[0].title)).toBeTruthy()

    })
})