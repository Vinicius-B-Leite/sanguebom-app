import React from 'react'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import ModalBase from '../index'
import { Text } from 'react-native'
import { fireEvent } from '@testing-library/react-native'


describe('ModalBase', () => {
    it('was rendered', () => {
        const { root } = renderWithProviders(
            <ModalBase modalProps={{ visible: true }}>
                <Text>Modal children</Text>
            </ModalBase>
        )

        expect(root.children.length).toBe(1)
    })

    it('closed when clicked on background', () => {
        const onRequestCloseMock = jest.fn()

        const { getByTestId } = renderWithProviders(
            <ModalBase modalProps={{ visible: true, onRequestClose: onRequestCloseMock }}>
                <Text>Modal children</Text>
            </ModalBase>
        )

        const backgroundElement = getByTestId('closeModalButton')
        fireEvent(backgroundElement, 'press')


        expect(onRequestCloseMock).toHaveBeenCalled()
    })
})