import React from "react";
import ModalCreateAlert from '../index'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import { bloodTypes } from "../../../utlis/bloodTypes";
import { UserType } from "../../../types/UserType";
import { act, fireEvent } from "@testing-library/react-native";
import * as apiService from '../../../api/createAlert'
import { darkMode } from "../../../theme/darkMode";

const mockUser: UserType = {
    email: 'user.email',
    password: 'user.password',
    token: 'user.token',
    type: 'bloodCollectors',
    uid: 'user.uid',
    username: 'user.username',
}
describe('ModalCreateAlert', () => {
    it('was rendered', () => {
        const { getByText } = renderWithProviders(
            <ModalCreateAlert
                visible={true}
                bTypesSelecteds={undefined}
                isAlertOn={undefined}
                onRequestClose={() => { }}
            />,
            {
                preloadedState: {
                    user: { user: mockUser }
                }
            }
        )
        const element = getByText(/alerta/i)
        expect(element).toBeTruthy()
    })

    it('changed color in darkMode theme', () => {
        const { getByText } = renderWithProviders(
            <ModalCreateAlert
                visible={true}
                bTypesSelecteds={bloodTypes}
                isAlertOn={true}
                onRequestClose={() => { }}
            />,
            {
                preloadedState: {
                    user: { user: mockUser }
                },
            },
            'dark'
        )
        const title = getByText(/alerta/i)
        const sectionTitle = getByText(/Ativado/i)
        const submitLabel = getByText(/Criar/i)


        expect(title.props.style[0].color).toBe(darkMode.colors.text_100)
        expect(sectionTitle.props.style[0].color).toBe(darkMode.colors.text_100)
        expect(submitLabel.props.style[0].color).toBe(darkMode.colors.oppositeContrast)
    })

    describe('blood type item was clicked', () => {
        it('if it was NOT selected should select', async () => {
            const { findByTestId } = renderWithProviders(
                <ModalCreateAlert
                    visible={true}
                    bTypesSelecteds={[]}
                    isAlertOn={true}
                    onRequestClose={() => { }}
                />,
                {
                    preloadedState: {
                        user: { user: mockUser }
                    }
                }
            )
            const selectBloodTypeElement = await findByTestId(`bloodType_A+`)
            fireEvent(selectBloodTypeElement, 'press')


            expect(selectBloodTypeElement.children[0].props.selected).toBeTruthy()
        })

        it('if it was selected should unselect', async () => {
            const { findByTestId } = renderWithProviders(
                <ModalCreateAlert
                    visible={true}
                    bTypesSelecteds={['A+']}
                    isAlertOn={true}
                    onRequestClose={() => { }}
                />,
                {
                    preloadedState: {
                        user: { user: mockUser }
                    }
                }
            )
            const selectBloodTypeElement = await findByTestId(`bloodType_A+`)
            fireEvent(selectBloodTypeElement, 'press')


            expect(selectBloodTypeElement.children[0].props.selected).toBeFalsy()
        })
    })

    it('submited alert to API', async () => {
        jest.useFakeTimers()
        jest.spyOn(apiService, 'createAlert').mockResolvedValueOnce(200)
        const onRequestCloseMock = jest.fn()


        const { getByText, getByPlaceholderText, getByTestId } = renderWithProviders(
            <ModalCreateAlert
                visible={true}
                bTypesSelecteds={bloodTypes}
                isAlertOn={true}
                onRequestClose={onRequestCloseMock}
            />,
            {
                preloadedState: {
                    user: { user: mockUser }
                }
            }
        )
        const switchAlertStatus = getByTestId('switchAlertStatus')
        const inputMessage = getByPlaceholderText(/mensagem/i)
        const submitButton = getByText(/criar/i)

        fireEvent(switchAlertStatus, 'valueChange')
        fireEvent(inputMessage, 'changeText', 'teste...')

        await act(() => {
            fireEvent(submitButton, 'press')
        })

        expect(onRequestCloseMock).toHaveBeenCalled()
    })

})