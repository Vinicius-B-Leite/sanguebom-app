import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.contrast};
    width: 100%;
    padding: 5%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Logo = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.md}px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.backgroundColor};
`
export const Notifications = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 13%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
`