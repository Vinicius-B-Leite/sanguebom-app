import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import SelectBloodTypeItem from '../index'
import { fireEvent } from "@testing-library/react-native";
import { lightMode } from "../../../theme/lightMode";


describe('SelectBloodTypeItem', () => {
    it('called onClick when it pressed', () => {
        const onCliclMock = jest.fn()
        const { getByText } = renderWithProviders(
            <SelectBloodTypeItem
                bloodType="A+"
                onClick={onCliclMock}
                selected={false}
            />
        )

        fireEvent.press(getByText('A+'))

        expect(onCliclMock).toHaveBeenCalledWith('A+')
    })
    it('changed style when it was selected and passed props', () => {
        const { getByText , getByTestId} = renderWithProviders(
            <SelectBloodTypeItem
                bloodType="A+"
                onClick={() => { }}
                selected
                fs={10}
                h={10}
                w={10}
            />
        )

        const bloodTypeContainer = getByTestId(`bloodType_A+`)
        const bloodTypeLabel = getByText('A+')

        expect(bloodTypeContainer.props.style.backgroundColor).toEqual(lightMode.colors.contrast_100)
        expect(bloodTypeContainer.props.style.width).toEqual(10)
        expect(bloodTypeContainer.props.style.height).toEqual(10)

        expect(bloodTypeLabel.props.style[0].fontSize).toEqual(10)
        expect(bloodTypeLabel.props.style[0].color).toEqual(lightMode.colors.oppositeContrast)
    })
})