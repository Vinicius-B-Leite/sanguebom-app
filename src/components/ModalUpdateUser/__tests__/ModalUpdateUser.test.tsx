import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import ModalUpdateUser from '../index'
import { act, fireEvent } from "@testing-library/react-native";
import { GenderType } from "../../../types/GenderType";


const fakeUser = {
    user: {
        uid: "123123123",
        email: 'email',
        password: "123123123",
        token: '11111',
        type: 'donors',
        username: 'username',
        bloodType: 'A+',
        gender: 'male' as GenderType
    }
}
describe('ModalUpdateUser', () => {
    it('rendered', () => {
        const { getByText } = renderWithProviders(
            <ModalUpdateUser
                closeModal={() => { }}
                submit={() => { }}
                title='Username'
                visible={true}
            />
        )

        expect(getByText(/atualizar username/i)).toBeTruthy()
    })

    it('called handleSubmit when submitButton was clicked with valueInput.length > 0 and confirmPassword == user.password', () => {
        const submitMock = jest.fn()


        const { getByText, getByPlaceholderText } = renderWithProviders(
            <ModalUpdateUser
                closeModal={() => { }}
                submit={submitMock}
                title='Username'
                visible={true}
            />,
            { preloadedState: { user: fakeUser } }
        )

        const submitButton = getByText(/salvar/i)
        const valueInput = getByPlaceholderText(/novo username/i)
        const confirmPasswordInput = getByPlaceholderText(/Digite sua senha atual para confirmar/i)

        fireEvent(valueInput, 'changeText', fakeUser.user.username)
        fireEvent(confirmPasswordInput, 'changeText', fakeUser.user.password)
        fireEvent(submitButton, 'press')

        expect(submitMock).toHaveBeenCalled()
    })

    it('DID NOT call handleSubmit when submitButton was clicked with valueInput.length < 0 OR confirmPassword !== user.password', () => {
        const submitMock = jest.fn()


        const { getByText } = renderWithProviders(
            <ModalUpdateUser
                closeModal={() => { }}
                submit={submitMock}
                title='Username'
                visible={true}
            />,
            { preloadedState: { user: fakeUser } }
        )

        const submitButton = getByText(/salvar/i)

        fireEvent(submitButton, 'press')

        expect(submitMock).not.toHaveBeenCalled()
    })

    it('cleaned input when close modal', async () => {
        const closeModalMock = jest.fn()

        const { findByTestId } = renderWithProviders(
            <ModalUpdateUser
                closeModal={closeModalMock}
                submit={() => { }}
                title='Username'
                visible={true}
            />
        )
        const closeModalButton = await findByTestId('closeModalButton')
        fireEvent(closeModalButton, 'press')
        expect(closeModalMock).toHaveBeenCalled()
    })
})

