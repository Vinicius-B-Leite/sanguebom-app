import React from 'react'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import ComunButton from '../index'
import { fireEvent } from '@testing-library/react-native'
import { lightMode } from '../../../theme/lightMode'


describe('ComunButton', () => {
    it('was rendered with children rendered', () => {
        const { getByText } = renderWithProviders(
            <ComunButton bg='darkContrast' onClick={() => { }}>
                Submit
            </ComunButton>)

        const element = getByText(/submit/i)

        expect(element).toBeTruthy()
    })

    it('called onClick prop function in onPrees', () => {
        const mockOnClick = jest.fn()
        const { getByText } = renderWithProviders(
            <ComunButton bg='darkContrast' onClick={mockOnClick}>
                Submit
            </ComunButton>)

        const element = getByText(/submit/i)

        fireEvent(element, 'press')

        expect(mockOnClick).toHaveBeenCalled()
    })

    it('changed background color and text color when bg prop was "darkContrast"', () => {
        const { getByText, getByTestId } = renderWithProviders(
            <ComunButton bg='white' onClick={() => { }}>
                Submit
            </ComunButton>)

        const labelElement = getByText(/submit/i)
        const containerViewElement = getByTestId('containerView')

        expect(labelElement.props.style[0].color).toBe(lightMode.colors.contrast_100)
        expect(containerViewElement.props.style.backgroundColor).toBe('#fff')
    })
})