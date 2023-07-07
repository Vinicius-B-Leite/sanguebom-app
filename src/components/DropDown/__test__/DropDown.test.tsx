import React from 'react'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import DropDown from '../index'
import { Text } from 'react-native'
import { fireEvent } from '@testing-library/react-native'
import { lightMode } from '../../../theme/lightMode'



describe('DropDown', () => {
    it('was rendered', () => {
        const { getByText } = renderWithProviders(
            <DropDown
                data={['1', '2', '3', '4', '5']}
                onSelect={() => { }}
                placeholder='Selecione um número'
                renderItem={({ item }) => <Text>{item}</Text>}
                value=''
            />
        )

        const element = getByText('Selecione um número')

        expect(element).toBeTruthy()
    })

    describe('placeholder was clicked', () => {
        it('opened data list', () => {
            const { getByText, getByTestId } = renderWithProviders(
                <DropDown
                    data={['1', '2', '3', '4', '5']}
                    onSelect={() => { }}
                    placeholder='Selecione um número'
                    renderItem={({ item }) => <Text>{item}</Text>}
                    value=''
                />
            )

            const placeholderElement = getByText('Selecione um número')
            fireEvent(placeholderElement, 'press')

            const dataListElement = getByTestId('dataList')

            expect(dataListElement).toBeTruthy()
        })
        it('arrow icon changed on opened', async () => {
            const { getByText, findByTestId } = renderWithProviders(
                <DropDown
                    data={['1', '2', '3', '4', '5']}
                    onSelect={() => { }}
                    placeholder='Selecione um número'
                    renderItem={({ item }) => <Text>{item}</Text>}
                    value=''
                />
            )

            const placeholderElement = getByText('Selecione um número')
            fireEvent(placeholderElement, 'press')

            const arrowIconElement = await findByTestId('arrowIcon')
            expect(arrowIconElement.props.style[0].color).toBe(lightMode.colors.contrast_100)
        })
        it('selected a item and closed data list', () => {
            const onSelecteMock = jest.fn()

            const { getByText } = renderWithProviders(
                <DropDown
                    data={['1', '2', '3', '4', '5']}
                    onSelect={onSelecteMock}
                    placeholder='Selecione um número'
                    renderItem={({ item }) => <Text>{item}</Text>}
                    value=''
                />
            )

            const placeholderElement = getByText('Selecione um número')
            fireEvent(placeholderElement, 'press')

            const itemDataListElement = getByText('1')
            fireEvent(itemDataListElement, 'press')

            expect(onSelecteMock).toBeCalledWith('1')
        })
        
    })


})