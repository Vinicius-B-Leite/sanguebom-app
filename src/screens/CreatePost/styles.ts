import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_100};
`


export const Header = styled.View`
    background-color: ${({ theme }) => theme.type === 'dark' ? theme.colors.background_100 : theme.colors.contrast_100};
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


export const PickImageBtn = styled.TouchableOpacity`
    align-self: center;
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.contrast_10};
    justify-content: center;
    margin-bottom: 5%;
`
export const Banner = styled.Image`
    width: 100%;
    height: 100%;
`


export const Form = styled.ScrollView`
    padding: 5%;
`

export const InputTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;

`
export const InputArea = styled.View`
    width: 100%;
    height: ${({ theme }) => theme.vw * 0.1}px;
    margin-bottom: 10%;
`
export const DescriptionArea = styled(InputArea)`
    height: ${({ theme }) => theme.vw * 0.5}px;
    margin-bottom: 10%;
`