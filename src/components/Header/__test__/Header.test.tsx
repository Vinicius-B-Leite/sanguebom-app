import React from 'react'
import { renderWithProviders, setupStore } from '../../../utlis/test-utils/customRender'
import Header from '../index'
import * as apiService from '../../../api/getNotificationLength'
import { GenderType } from '../../../types/GenderType'
import { darkMode } from '../../../theme/darkMode'
import { fireEvent } from '@testing-library/react-native'
import { store } from '../../../feature/store'
import { setNotificationLength } from '../../../feature/notification/notificationSlice'


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
    }
}
describe('Header', () => {
    it('was rendered without notification number when notification length > 0', () => {
        const { queryByTestId } = renderWithProviders(
            <Header
                onClickBell={() => { }}
                onClickBloodDonate={() => { }}
            />,
            {
                preloadedState: {
                    notification: { length: 1 },
                    user: { ...fakeUser }
                },
            })

        const notificationLenght = queryByTestId('notificationLenght')
        expect(notificationLenght).toBeNull()
    })

    it('called onClickBell on bellIcon clicked', async () => {
        const onClickBellMock = jest.fn()

        const { findByTestId } = renderWithProviders(
            <Header
                onClickBell={onClickBellMock}
                onClickBloodDonate={() => { }}
            />,
            {
                preloadedState: {
                    notification: { length: 1 },
                    user: { ...fakeUser }
                },
            })

        const bellIcon = await findByTestId('bellIcon')
        fireEvent(bellIcon, 'press')

        expect(onClickBellMock).toHaveBeenCalled()
    })

    it('called onClickBloodDonate on bloodDonateIcon clicked', async () => {
        const onClickBloodDonate = jest.fn()

        const { findByTestId } = renderWithProviders(
            <Header
                onClickBell={() => { }}
                onClickBloodDonate={onClickBloodDonate}
            />,
            {
                preloadedState: {
                    notification: { length: 1 },
                    user: { ...fakeUser }
                },
            })

        const bloodDonateIcon = await findByTestId('bloodDonateIcon')
        fireEvent(bloodDonateIcon, 'press')


        expect(onClickBloodDonate).toHaveBeenCalled()
    })

    describe('notification length was equals 0', () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.spyOn(apiService, 'getNotificationLength').mockResolvedValue(14)
        })

        it('notification length was rendered', async () => {
            const { findByText } = renderWithProviders(
                <Header
                    onClickBell={() => { }}
                    onClickBloodDonate={() => { }}
                />,
                {
                    preloadedState: {
                        notification: { length: 0 },
                        user: { ...fakeUser }
                    },
                })

            const notificationNumberElement = await findByText('14')
            expect(notificationNumberElement).toBeTruthy()
        })

        it('dispach was called when api response was correctly', async () => {
            renderWithProviders(
                <Header
                    onClickBell={() => { }}
                    onClickBloodDonate={() => { }}
                />,
                {
                    preloadedState: {
                        notification: { length: 0 },
                        user: { ...fakeUser }
                    },
                })

            const store = setupStore()
            store.dispatch(setNotificationLength(14))

            expect(store.getState().notification.length).toBe(14)
        })

        it('notification length was formated when it was > 99', async () => {
            jest.spyOn(apiService, 'getNotificationLength').mockResolvedValue(100)

            const { findByText } = renderWithProviders(
                <Header
                    onClickBell={() => { }}
                    onClickBloodDonate={() => { }}
                />,
                {
                    preloadedState: {
                        notification: { length: 0 },
                        user: { ...fakeUser }
                    },
                })

            const notificationNumberElement = await findByText('99+')
            // console.log(notificationNumberElement.value)
            expect(notificationNumberElement).toBeDefined()
        })

        it('icon color and notificationLenght backgrodund color changed when theme was darkMode', async () => {

            const { findByTestId } = renderWithProviders(
                <Header
                    onClickBell={() => { }}
                    onClickBloodDonate={() => { }}
                />,
                {
                    preloadedState: {
                        notification: { length: 0 },
                        user: { ...fakeUser }
                    },
                },
                'dark'
            )

            const bellIconElement = await findByTestId('bellIcon')
            const notificationLenght = await findByTestId('notificationLenght')

            expect(bellIconElement.props.style[0].color).toBe(darkMode.colors.text_200)
            expect(notificationLenght.props.style[0].backgroundColor).toBe(darkMode.colors.contrast_100)
        })
        

    })
})