import styled from "styled-components/native"

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.communHeaderColor};
    padding: 5%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Title = styled.Text`
    color: ${({ theme }) => theme.type === 'dark' ? theme.colors.text_200 : theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.md}px;
`
export const DoneBtn = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.type === 'dark' ? theme.colors.contrast_100 : theme.colors.background_100};
    flex-direction: row;
    width: 20%;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`
export const DoneTxt = styled.Text`
    color: ${({ theme }) => theme.type === 'dark' ? theme.colors.text_200 : theme.colors.contrast_100};
    font-size: ${({ theme }) => theme.fontSize.sm}px;
`