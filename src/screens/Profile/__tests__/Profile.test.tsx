import React from "react";
import { act, fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import Profile from '../index'
import * as apiService from '../../../api/updateUserCredencials'
import * as pickImageMock from '../../../utlis/pickImage'
import * as userStorage from '../../../storage/userStorage'
import * as themeStorage from '../../../storage/themeStorage'
import { mocks } from './mocks'


const mockNavigate = jest.fn()


jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate
    })
}))

jest.mock('../../../api/getNotificationLength', () => jest.fn())

const comunRenderProps = {
    preloadedState: {
        user: mocks.fakeUser,
        theme: {
            isDark: false
        }
    },
}

const bloodCollectorsRenderProps = {
    preloadedState: {
        user: mocks.fakeBloodCollectorsUser,
        theme: {
            isDark: false
        }
    },
}

describe('Profile', () => {

    it('rendered', () => {
        const { getByText } = renderWithProviders(<Profile />, { ...comunRenderProps })

        expect(getByText(mocks.fakeUser.user.username)).toBeTruthy()
    })
    it('navigated to Notification screen when bellIcon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const bellIcon = await findByTestId('bellIcon')

        fireEvent.press(bellIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'Notification' })
    })
    it('navigated to MyDonates screen when bloodDonateIcon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const bloodDonateIcon = await findByTestId('bloodDonateIcon')

        fireEvent.press(bloodDonateIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'MyDonates' })
    })
    it('updated username and saved on cache', async () => {
        jest.useFakeTimers()
        const updateUserMock = jest.spyOn(apiService, 'updateUserCredencials').mockResolvedValueOnce({
            ...mocks.updateUserCredentialsResponse,
            username: 'newUsername'
        })

        const { getByText, getByPlaceholderText } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const usernameOption = getByText(`Nome de usuário`)
        fireEvent.press(usernameOption)

        const usernameInput = getByPlaceholderText(`Novo nome`, { exact: false })
        const confirmPasswordInput = getByPlaceholderText(/Digite sua senha atual para confirmar/i)
        const submitModalBtn = getByText(/Salvar/i)

        fireEvent.changeText(usernameInput, 'newUsername')
        fireEvent.changeText(confirmPasswordInput, mocks.fakeUser.user.password)
        fireEvent.press(submitModalBtn)

        await waitFor(() => expect(updateUserMock).toHaveBeenCalled())
        const userCache = userStorage.getStorageUser()

        expect(userCache?.username).toEqual('newUsername')
        expect(getByText('newUsername')).toBeTruthy()
    })
    it('updated theme and saved on cache', async () => {

        const { getByText } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const themeOption = getByText(`Trocar de tema`)
        fireEvent.press(themeOption)


        const themeCache = themeStorage.getStorageTheme()
        expect(themeCache).toEqual('dark')
    })
    it('updated password and saved on cache', async () => {
        jest.useFakeTimers()
        const updateUserMock = jest.spyOn(apiService, 'updateUserCredencials').mockResolvedValueOnce({
            ...mocks.updateUserCredentialsResponse,
            password: 'newPassword'
        })

        const { getByText, getByPlaceholderText } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const passwordOption = getByText(`Senha`)
        fireEvent.press(passwordOption)

        const usernameInput = getByPlaceholderText(`Novo Senha`, { exact: false })
        const confirmPasswordInput = getByPlaceholderText(/Digite sua senha atual para confirmar/i)
        const submitModalBtn = getByText(/Salvar/i)

        fireEvent.changeText(usernameInput, 'newPassword')
        fireEvent.changeText(confirmPasswordInput, mocks.fakeUser.user.password)
        fireEvent.press(submitModalBtn)

        await waitFor(() => expect(updateUserMock).toHaveBeenCalled())
        const userCache = userStorage.getStorageUser()

        expect(userCache?.password).toEqual('newPassword')
    })
    it('logged out user', () =>{

        const { getByText } = renderWithProviders(<Profile />, { ...comunRenderProps })

        const passwordOption = getByText(`Sair`)
        fireEvent.press(passwordOption)

        const userCache = userStorage.getStorageUser()
        expect(userCache).toBeNull()
    })
    describe('user type is "donors"', () => {
        it('DID NOT chang avatar', async () => {
            const pickImageSpy = jest.spyOn(pickImageMock, 'pickImage').mockResolvedValueOnce({
                canceled: false,
                assets: [{
                    type: 'image',
                    uri: 'abc.jpeg',
                    width: 200,
                    height: 200
                }]
            })
            const { getByTestId } = renderWithProviders(<Profile />, { ...comunRenderProps })

            const avatarImage = getByTestId('avatarImage')
            fireEvent.press(avatarImage)



            expect(pickImageSpy).not.toHaveBeenCalled()

        })
    })
    describe('user type is "bloodCollectors"', () => {
        it('updated avatar and saved on cache', async () => {
            jest.useFakeTimers()
            jest.spyOn(pickImageMock, 'pickImage').mockResolvedValueOnce({
                canceled: false,
                assets: [{
                    type: 'image',
                    uri: 'abc.jpeg',
                    width: 200,
                    height: 200
                }]
            })
            jest.spyOn(apiService, 'updateUserCredencials').mockResolvedValueOnce({
                ...mocks.updateBloodCollectorCredentialsResponse,
                bloodCollectors: {
                    ...mocks.updateBloodCollectorCredentialsResponse.bloodCollectors,
                    imageURL: 'imgUpdated'
                }
            })

            const { getByTestId } = renderWithProviders(<Profile />, { ...bloodCollectorsRenderProps })

            const avatarImage = getByTestId('avatarImage')
            fireEvent.press(avatarImage)
            await act(() => {
                jest.runAllTimers()
            })

            const userCache = userStorage.getStorageUser()

            expect(userCache?.imageURL).toEqual('imgUpdated')
            expect(avatarImage.props.source.uri.includes('imgUpdated')).toBeTruthy()
        })
        it('updated adress and saved on cache', async () => {
            jest.useFakeTimers()
            jest.spyOn(apiService, 'updateUserCredencials').mockResolvedValueOnce({
                ...mocks.updateBloodCollectorCredentialsResponse,
                bloodCollectors: {
                    ...mocks.updateBloodCollectorCredentialsResponse.bloodCollectors,
                    adress: 'adressUpdated'
                }
            })

            const { getByText, getByPlaceholderText } = renderWithProviders(<Profile />, { ...bloodCollectorsRenderProps })
            const adressOption = getByText(/Endereço/i)
            fireEvent.press(adressOption)

            const adressInput = getByPlaceholderText(/Novo Endereço/i)
            const confirmPasswordInput = getByPlaceholderText(/Digite sua senha atual para confirmar/i)
            const submitBtn = getByText(/Salvar/i)

            fireEvent.changeText(adressInput, 'adressUpdated')
            fireEvent.changeText(confirmPasswordInput, mocks.fakeBloodCollectorsUser.user.password)


            await act(() => {
                fireEvent.press(submitBtn)
            })

            const userCache = userStorage.getStorageUser()

            expect(userCache?.adress).toEqual('adressUpdated')

        })
        it('updated phone number and saved on cache', async () => {
            jest.useFakeTimers()
            jest.spyOn(apiService, 'updateUserCredencials').mockResolvedValueOnce({
                ...mocks.updateBloodCollectorCredentialsResponse,
                bloodCollectors: {
                    ...mocks.updateBloodCollectorCredentialsResponse.bloodCollectors,
                    phoneNumber: 'phoneNumberUpdated'
                }
            })

            const { getByText, getByPlaceholderText } = renderWithProviders(<Profile />, { ...bloodCollectorsRenderProps })
            const phoneNumberOption = getByText('Número de telefone')
            fireEvent.press(phoneNumberOption)

            const phoneNumberInput = getByPlaceholderText('Novo Número de telefone')
            const confirmPasswordInput = getByPlaceholderText(/Digite sua senha atual para confirmar/i)
            const submitBtn = getByText(/Salvar/i)

            fireEvent.changeText(phoneNumberInput, 'phoneNumberUpdated')
            fireEvent.changeText(confirmPasswordInput, mocks.fakeBloodCollectorsUser.user.password)


            await act(() => {
                fireEvent.press(submitBtn)
            })
            const userCache = userStorage.getStorageUser()

            expect(userCache?.phoneNumber).toEqual('phoneNumberUpdated')
        })
    })
})
