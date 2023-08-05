import styled from "styled-components/native";

export const NextQuestionArea = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.contrast_100};
    justify-content: center;
    align-items: center;
    padding: 5%;
    border-radius:  ${({theme}) => theme.borderRadius.xsm}px;
`
export const NextQuestionLabel = styled.Text`
    font-size: ${({theme}) => theme.fontSize.xsm}px;
    color:  ${({theme}) => theme.colors.oppositeContrast};
    font-weight: bold;
`