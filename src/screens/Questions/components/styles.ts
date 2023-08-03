import styled from "styled-components/native";

export const ButtonArea = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.contrast_100};
    flex-direction: row;
    align-items: center;
    gap: ${({theme}) => theme.vh * 0.01}px;
    padding: 3%;
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
`
export const Label = styled.Text`
    color: ${({theme}) => theme.colors.oppositeContrast};
    font-size: ${({theme}) => theme.fontSize.xsm}px;
`