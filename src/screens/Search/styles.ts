import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    position: relative;
`
export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.contrast};
    width: 100%;
    padding: 5%;
    flex-direction: row;
`
export const GoBack = styled.TouchableOpacity`
    width: 12%;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`
export const Input = styled.TextInput`
    background-color: ${({theme}) => theme.colors.inputBackgroundColor};
    width: 85%;
    padding: 0% 5%;
    border-radius: ${({theme}) => theme.borderRadius.sm}px;
    color: ${({theme}) => theme.colors.backgroundColor};
`