import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.contrast_10};
    padding: 5%;
    margin: 3% 0%;
`
export const Header = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Question = styled.Text`
    max-width: 85%;
    color: ${({ theme }) => theme.colors.text_200};
    font-size: ${({theme}) => theme.fontSize.xxsm}px;
`
export const OpenDescription = styled.TouchableOpacity``
export const Description = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    margin-top: 3%;
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;
`