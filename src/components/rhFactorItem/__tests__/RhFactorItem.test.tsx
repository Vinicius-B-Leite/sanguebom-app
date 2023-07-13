import React from "react";
import RhFactorItem from '../index'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import { fireEvent } from "@testing-library/react-native";
import { lightMode } from "../../../theme/lightMode";


describe('RhFactorItem', () => {
    it('called onClick when pressed', () => {
        const onClickMock = jest.fn()
        const { getByText } = renderWithProviders(
            <RhFactorItem
                onClick={onClickMock}
                rh='-'
                selected={false}
            />
        )
        const rhFactor = getByText('-')
        fireEvent(rhFactor, 'press')

        expect(onClickMock).toHaveBeenCalledWith('-')
    })
    it('changed style when it was selected', () => {
        const { getByTestId } = renderWithProviders(
            <RhFactorItem
                onClick={()=>{}}
                rh='-'
                selected={true}
            />
        )
        const rhContainer = getByTestId('rhContainer')
       

        expect(rhContainer.props.style.backgroundColor).toEqual(lightMode.colors.contrast_100)
    })
    
})