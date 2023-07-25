import React from "react";
import SelectBloodType from '../index'
import { fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import { lightMode } from "../../../theme/lightMode";




const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate
    })
}))


describe('SelectBloodType', () => {
    it('rendered', () => {
        const { getByText } = renderWithProviders(<SelectBloodType />)

        expect(getByText(/SELECIONE SEU TIPO SANGUÍNEO/i)).toBeTruthy()
    })
    it('went back when header arrow-icon clicked', async () => {
        const { findByTestId } = renderWithProviders(<SelectBloodType />)

        expect(await findByTestId('arrow-icon')).toBeTruthy()

    })
    it('selected single blood type', async () => {
        const { getByTestId } = renderWithProviders(<SelectBloodType />)

        const bloodTypeAB = getByTestId('bloodType_AB')
        const bloodTypeO = getByTestId('bloodType_O')

        fireEvent.press(bloodTypeAB)
        expect(bloodTypeAB.props.style.backgroundColor).toEqual(lightMode.colors.contrast_100)

        fireEvent.press(bloodTypeO)
        expect(bloodTypeO.props.style.backgroundColor).toEqual(lightMode.colors.contrast_100)
        expect(bloodTypeAB.props.style.backgroundColor).toEqual(lightMode.colors.contrast_20)
    })
    it('selected single rh factor', () => {
        const { getByText } = renderWithProviders(<SelectBloodType />)
        const positiveRh = getByText('+')

        fireEvent.press(positiveRh)
        expect(positiveRh.props.style[0].color).toEqual(lightMode.colors.oppositeContrast)
    })
    it('navigated to Sing up screen if blood type and rh factor were selecteds', () => {
        const { getByTestId, getByText } = renderWithProviders(<SelectBloodType />)

        fireEvent.press(getByTestId('bloodType_AB'))
        fireEvent.press(getByText('+'))
        fireEvent.press(getByText(/avançar/i))

        expect(mockNavigate).toHaveBeenCalledWith('SingUp', { bloodtype: 'AB' + '+' })
    })
    it('DID NOT navigate to Sing up screen if blood type and rh factor were NOT selecteds', () => {
        mockNavigate.mockClear()
        const { getByText } = renderWithProviders(<SelectBloodType />)

        fireEvent.press(getByText(/avançar/i))

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})