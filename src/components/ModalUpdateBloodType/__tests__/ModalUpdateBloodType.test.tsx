import React from "react";
import { fireEvent, renderWithProviders } from '../../../utlis/test-utils/customRender'
import ModalUpdateBloodType from '../index'
import { mocks } from './mocks'
import * as onesignal from '../../../onesignal/updateBloodTypeTag'

describe('ModalUpdateBloodType', () => {
    it('rendered', () => {
        const { getByText } = renderWithProviders(
            <ModalUpdateBloodType
                onRequestClose={() => { }}
                onSubmit={() => { }}
                visible={true}
            />
        )

        expect(getByText(/Selecione seu tipo sanguíeno/i)).toBeTruthy()
    })

    it('did NOT rendered when user type === bloodCollectors', () => {
        const { queryByText } = renderWithProviders(
            <ModalUpdateBloodType
                onRequestClose={() => { }}
                onSubmit={() => { }}
                visible={true}
            />,
            { preloadedState: { user: { user: mocks.fakeUserBloodCollector } } }
        )

        expect(queryByText(/Selecione seu tipo sanguíeno/i)).toBeNull()
    })

    it('current user blood type was selected when render', () => {
        const { getByText } = renderWithProviders(
            <ModalUpdateBloodType
                onRequestClose={() => { }}
                onSubmit={() => { }}
                visible={true}
            />,
            { preloadedState: { user: { user: mocks.fakeUser } } }
        )

        const userBloodType = getByText(mocks.fakeUser.bloodType as string)
        expect(userBloodType.props.selected).toBeTruthy()
    })
    it('did NOT do anything when user pressed save button with the same user blood type ', () => {
        const mockonRequestClose = jest.fn()
        const { getByText } = renderWithProviders(
            <ModalUpdateBloodType
                onRequestClose={mockonRequestClose}
                onSubmit={() => { }}
                visible={true}
            />,
            { preloadedState: { user: { user: mocks.fakeUser } } }
        )

        fireEvent.press(getByText(/salvar/i))

        expect(mockonRequestClose).not.toHaveBeenCalled()
    })
    describe('user selected a blood type and clicked on save button', () => {

        const mockupdateBloodTypeTag = jest.spyOn(onesignal, 'updateBloodTypeTag').mockReturnValue()
        it('called onSubmit function prop ', () => {
            const mockOnSubmit = jest.fn()

            const { getByText } = renderWithProviders(
                <ModalUpdateBloodType
                    onRequestClose={() => { }}
                    onSubmit={mockOnSubmit}
                    visible={true}
                />,
                { preloadedState: { user: { user: mocks.fakeUser } } }
            )


            const aPositive = getByText('B+')
            fireEvent.press(aPositive)

            fireEvent.press(getByText(/salvar/i))

            expect(mockOnSubmit).toHaveBeenCalledWith('B+')

        })
        it('closed modal', () => {
            const mockonRequestClose = jest.fn()

            const { getByText } = renderWithProviders(
                <ModalUpdateBloodType
                    onRequestClose={mockonRequestClose}
                    onSubmit={() => { }}
                    visible={true}
                />,
                { preloadedState: { user: { user: mocks.fakeUser } } }
            )


            const aPositive = getByText('AB+')
            fireEvent.press(aPositive)

            fireEvent.press(getByText(/salvar/i))

            expect(mockonRequestClose).toHaveBeenCalled()

        })
        it('updated blood type tag on OneSignal', () => {
            const { getByText } = renderWithProviders(
                <ModalUpdateBloodType
                    onRequestClose={() => { }}
                    onSubmit={() => { }}
                    visible={true}
                />,
                { preloadedState: { user: { user: mocks.fakeUser } } }
            )


            const aPositive = getByText('AB+')
            fireEvent.press(aPositive)

            fireEvent.press(getByText(/salvar/i))

            expect(mockupdateBloodTypeTag).toHaveBeenCalled()

        })
    })
})