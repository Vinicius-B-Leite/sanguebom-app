import React from "react";
import SingUp from '../index'
import { cleanup, fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import * as apiService from '../../../api/createAcount'
import { mocks } from './mocks'
import { getStorageUser } from "../../../storage/userStorage";
import { Alert } from 'react-native'



const mockGoback = jest.fn()

const renderComponent = () => renderWithProviders(
    <SingUp
        navigation={{ ...jest.requireActual('@react-navigation/stack'), goBack: mockGoback }}
        route={{ ...jest.requireActual('@react-navigation/stack'), params: { bloodtype: 'AB+' } }}
    />
)




describe('SingUp', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    it('rendered', () => {
        const { getByText } = renderComponent()
        expect(getByText(/Criar conta/i)).toBeTruthy()
    })
    it('DID NOT submit if username did not pass', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        expect(createAccSpy).not.toHaveBeenCalled()
    })
    it('DID NOT submit if email did not pass', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        expect(createAccSpy).not.toHaveBeenCalled()
    })
    it('DID NOT submit if password did not pass', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        expect(createAccSpy).not.toHaveBeenCalled()
    })
    it('DID NOT submit if confirm password did not pass', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        expect(createAccSpy).not.toHaveBeenCalled()
    })
    it('DID NOT submit if gender did not pass', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')
        fireEvent.press(submitButton)

        expect(createAccSpy).not.toHaveBeenCalled()
    })
    it('submited correctly and saved user on cache when all props were passed', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockResolvedValueOnce(mocks.userCreated)

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        await waitFor(() => expect(createAccSpy).toHaveBeenCalled())
        expect(createAccSpy).toHaveBeenCalled()

        const userStorage = getStorageUser()
        expect(userStorage).toBeTruthy()

        createAccSpy.mockReset()
    })
    it('showed alert if code error response WAS NOT included in ["02", "03", "13", "20"] ', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockRejectedValueOnce({
            response: {
                data: {
                    code: '01'
                }
            }
        })
        const mockAlert = jest.spyOn(Alert, 'alert')

        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        await waitFor(() => expect(createAccSpy).toHaveBeenCalled())
        expect(createAccSpy).toHaveBeenCalled()

        expect(mockAlert).toHaveBeenCalled()
    })
    it('showed email error message if the email did NOT pass in verification', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Error email',
                    code: '02'
                }
            }
        })

        const { getByText, getByPlaceholderText, findByText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        await waitFor(() => expect(createAccSpy).toHaveBeenCalled())

        const emailMessageError = await findByText('Error email')

        expect(emailMessageError).toBeTruthy()
    })
    it('showed password error message if the password did NOT pass in verification', async () => {
        const createAccSpy = jest.spyOn(apiService, 'createAccount').mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Error password',
                    code: '03'
                }
            }
        })

        const { getByText, getByPlaceholderText, findByText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)
        const genderDropDown = getByText(/Selecione seu sexo biológico/i)
        const submitButton = getByText(/Concluir/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '123123')

        fireEvent.press(genderDropDown)
        fireEvent.press(getByText('Feminino'))

        fireEvent.press(submitButton)

        await waitFor(() => expect(createAccSpy).toHaveBeenCalled())

        const passwordMessageError = await findByText('Error password')
        expect(passwordMessageError).toBeTruthy()
    })
    it('showed confirm password error message if it did NOT equal to password', async () => {
        const { getByText, getByPlaceholderText } = renderComponent()

        const usernameInput = getByPlaceholderText(/Nome de usuário/i)
        const emailInput = getByPlaceholderText(/Email/i)
        const passwordInput = getByPlaceholderText('Senha')
        const confirmPasswordInput = getByPlaceholderText(/Confirme a senha/i)


        fireEvent.changeText(usernameInput, 'username')
        fireEvent.changeText(emailInput, 'email')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.changeText(confirmPasswordInput, '321')

        expect(getByText('As senhas devem ser iguais')).toBeTruthy()
    })
    it('went back when arrow-icon was clicked', async () => {
        const { findByTestId } = renderComponent()

        const arrowIcon = await findByTestId('arrow-icon')
        fireEvent.press(arrowIcon)

        expect(mockGoback).toHaveBeenCalled()
    })
})
