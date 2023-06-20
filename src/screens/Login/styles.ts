import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_100};
`;

export const GoBack = styled.TouchableOpacity`
    margin: 5%;
    width: 10%;
    height: 5%;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast_100};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg}px;
    text-align: center;
    margin-top: 20%;
    margin-bottom: 5%;
`

export const InputArea = styled.View`
    width: 85%;
    margin: 2% 0%;
    align-self: center;
`


type Props = {
    isEnable: boolean
}
export const SubmitButton = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, isEnable }) => isEnable ? theme.colors.contrast_100 : theme.colors.contrast_10};
    width: 85%;
    justify-content: center;
    align-items: center;
    padding:  3%;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
    margin-top: 5%;
    align-self: center;
`
export const SubmitLabel = styled.Text<Props>`
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    color: ${({ theme, isEnable }) => isEnable ? theme.colors.background_100 : theme.colors.contrast_100};
    font-weight: 700;
`

