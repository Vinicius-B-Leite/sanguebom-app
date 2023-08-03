import styled from "styled-components/native";
import { css } from "styled-components/native";

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.background_100};
    margin: 30% 5%;
    padding: 10% 5%;
    gap: ${({theme}) => theme.vw * 0.05}px;
    border-radius: ${({theme}) => theme.borderRadius.xsm}px;
`
export const Title = styled.Text`
    ${({theme}) => css`
        font-size: ${theme.fontSize.xsm}px;
        color: ${theme.colors.text_200};
        font-weight: bold;
    `}
`
export const BloodTypesContainer = styled.View`
    height: ${({theme}) => theme.vh * 0.2}px;
`

export const BtnArea = styled.View`
    height:${({theme}) => theme.vh * 0.07}px; ;
`