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
    position: relative;
`

export const NotificationNumberArea = styled.View`
    position: absolute;
    width: ${({ theme }) => theme.vw * 0.06}px;
    height: ${({ theme }) => theme.vw * 0.06}px;
    background-color: green;
    top: -${({ theme }) => theme.vw * 0.02}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    left: -${({ theme }) => theme.vw * 0.02}px;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    justify-content: center;
    align-items: center;
`

export const NotificationLabel = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.contrast};
`