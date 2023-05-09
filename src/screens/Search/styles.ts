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

export const AlertInfoContainer = styled.View`
    position: absolute;
    bottom: 2%;
    left: 5%;
    right: 5%;
    background-color: ${({theme}) => theme.colors.contrast};
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
    padding: 2% 5%;
    flex-direction: row;
    justify-content: space-between;
`

export const Left = styled.View`
    max-width: 35%;
`
export const BloodCollectorName = styled.Text`
    color: ${({theme}) => theme.colors.backgroundColor};
    font-size: ${({theme}) => theme.fontSize.xsm}px;
`
export const Right = styled.View`
    max-width: 60%;
`

export const BloodTypeItem = styled.Text`
    color: ${({theme}) => theme.colors.backgroundColor};
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;
`