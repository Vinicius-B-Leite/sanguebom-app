import React from "react";
import { fireEvent, renderWithProviders, screen, waitFor } from '../../../utlis/test-utils/customRender'
import Login from '../index'
import *  as apiService from '../../../api/login'
import { GenderType } from "../../../types/GenderType";
import { Alert } from "react-native";

const fakeUser: apiService.AuthResponse = {
    username: 'user.name',
    email: 'user.email@gmail.com',
    password: 'user.password',
    type: 'donors',
    token: 'user.token',
    donors: {
        bloodType: 'A+',
        gender: 'male' as GenderType,
        uid: 'user.uid',
        userEmail: 'user.email@gmail.com'
    },
    bloodCollectors: null
}

const fakeBloodCollector: apiService.AuthResponse = {
    username: 'fakeBloodCollector.name',
    email: 'fakeBloodCollector.email@gmail.com',
    password: 'fakeBloodCollector.password',
    type: 'bloodCollectors',
    token: 'fakeBloodCollector.token',
    bloodCollectors: {
        adress: 'fakeBloodCollector.adress',
        imageURL: 'fakeBloodCollector.imageURL',
        phoneNumber: 'fakeBloodCollector.phoneNumber',
        uid: 'fakeBloodCollector.uid',
        userEmail: 'fakeBloodCollector.userEmail',
    },
    donors: null
}

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: mockedGoBack
    })
}));
describe('Login', () => {

    it('rendered', () => {
        renderWithProviders(<Login />)

        expect(screen.getByText(/login/i)).toBeTruthy()
    })
    it('was NOT submited when email did not have @', async () => {
        jest.useFakeTimers()
        const loginSpy = jest.spyOn(apiService, 'login').mockResolvedValue(fakeUser)

        renderWithProviders(<Login />)

        const emailInput = screen.getByPlaceholderText(/seu email/i)
        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(emailInput, 'user.emailgmail.com')
        fireEvent.changeText(passwordInput, 'user.password')


        fireEvent.press(submitBtn)

        expect(loginSpy).not.toHaveBeenCalled()
    })
    it('was NOT submited when password length < 8', async () => {
        jest.useFakeTimers()
        const loginSpy = jest.spyOn(apiService, 'login').mockResolvedValue(fakeUser)

        renderWithProviders(<Login />)

        const emailInput = screen.getByPlaceholderText(/seu email/i)
        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(emailInput, 'user.email@gmail.com')
        fireEvent.changeText(passwordInput, '123')


        fireEvent.press(submitBtn)

        expect(loginSpy).not.toHaveBeenCalled()
    })
    it('was NOT submited when email length == 0', async () => {
        jest.useFakeTimers()
        const loginSpy = jest.spyOn(apiService, 'login').mockResolvedValue(fakeUser)

        renderWithProviders(<Login />)

        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(passwordInput, 'user.password')


        fireEvent.press(submitBtn)

        expect(loginSpy).not.toHaveBeenCalled()
    })

    describe('submited correctly when email and password were passed', () => {
        it('retured a comun user credentials', async () => {
            jest.useFakeTimers()
            const loginSpy = jest.spyOn(apiService, 'login').mockResolvedValue(fakeUser)

            renderWithProviders(<Login />)

            const emailInput = screen.getByPlaceholderText(/seu email/i)
            const passwordInput = screen.getByPlaceholderText(/sua senha/i)
            const submitBtn = screen.getByText(/concluir/i)

            fireEvent.changeText(emailInput, 'user.email@gmail.com')
            fireEvent.changeText(passwordInput, 'user.password')


            fireEvent.press(submitBtn)

            await waitFor(() => expect(loginSpy).toHaveBeenCalled())
            expect(loginSpy).toHaveBeenCalledWith({ email: 'user.email@gmail.com', password: 'user.password' })
        })
        it('retured a blood collector credentials', async () => {
            jest.useFakeTimers()
            const loginSpy = jest.spyOn(apiService, 'login').mockResolvedValue(fakeBloodCollector)

            renderWithProviders(<Login />)

            const emailInput = screen.getByPlaceholderText(/seu email/i)
            const passwordInput = screen.getByPlaceholderText(/sua senha/i)
            const submitBtn = screen.getByText(/concluir/i)

            fireEvent.changeText(emailInput, 'user.email@gmail.com')
            fireEvent.changeText(passwordInput, 'user.password')


            fireEvent.press(submitBtn)

            await waitFor(() => expect(loginSpy).toHaveBeenCalled())
            expect(loginSpy).toHaveBeenCalledWith({ email: 'user.email@gmail.com', password: 'user.password' })
        })

    })
    it('showed email message error', async () => {
        jest.useFakeTimers()
        const loginSpy = jest.spyOn(apiService, 'login').mockRejectedValue({
            response: {
                data: {
                    code: '05',
                    message: 'error email 05'
                }
            }
        })

        renderWithProviders(<Login />)

        const emailInput = screen.getByPlaceholderText(/seu email/i)
        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(emailInput, 'user.email@gmail.com')
        fireEvent.changeText(passwordInput, 'user.password')


        fireEvent.press(submitBtn)

        await waitFor(() => expect(loginSpy).toHaveBeenCalled())
        expect(loginSpy).toHaveBeenCalled()


        const messageError = await screen.findByText('error email 05')
        expect(messageError).toBeTruthy()
    })
    it('showed password message error', async () => {
        jest.useFakeTimers()
        const loginSpy = jest.spyOn(apiService, 'login').mockRejectedValue({
            response: {
                data: {
                    code: '03',
                    message: 'error password 05'
                }
            }
        })

        renderWithProviders(<Login />)

        const emailInput = screen.getByPlaceholderText(/seu email/i)
        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(emailInput, 'user.email@gmail.com')
        fireEvent.changeText(passwordInput, 'user.password')


        fireEvent.press(submitBtn)

        await waitFor(() => expect(loginSpy).toHaveBeenCalled())
        expect(loginSpy).toHaveBeenCalled()


        const passwordError = await screen.findByText('error password 05')
        expect(passwordError).toBeTruthy()
    })
    it('showed alert with error have NOT handler', async () => {
        jest.useFakeTimers()
        const alertSpy = jest.spyOn(Alert, 'alert')
        const loginSpy = jest.spyOn(apiService, 'login').mockRejectedValue({
            response: {
                data: {
                    code: '-1',
                    message: 'internal server error'
                }
            }
        })

        renderWithProviders(<Login />)

        const emailInput = screen.getByPlaceholderText(/seu email/i)
        const passwordInput = screen.getByPlaceholderText(/sua senha/i)
        const submitBtn = screen.getByText(/concluir/i)

        fireEvent.changeText(emailInput, 'user.email@gmail.com')
        fireEvent.changeText(passwordInput, 'user.password')


        fireEvent.press(submitBtn)

        await waitFor(() => expect(loginSpy).toHaveBeenCalled())
        expect(loginSpy).toHaveBeenCalled()


        expect(alertSpy).toBeCalled()
    })
    it('went back when arrow left was clicked', async () => {
        renderWithProviders(<Login />)

        const arrowLeft = screen.getByTestId('arrowLeft')

        fireEvent.press(arrowLeft)

        expect(mockedGoBack).toBeCalled()
    })
})