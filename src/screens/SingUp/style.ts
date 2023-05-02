import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;


export const GoBack = styled.TouchableOpacity`
    margin: 5%;
    width: 10%;
    height: 5%;
    justify-content: center;
    align-items: center;
`


export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.fontSize.lg}px;
    font-weight: 700;
    text-align: center;
    margin-vertical: 7%;
`


export const Form = styled.View`
    flex: 1;
`
export const InputArea = styled.View`
    width: 85%;
    height: ${({ theme }) => theme.vh * 0.07}px;
    margin: 2% 0%;
    align-self: center;
`

type Props = {
    isEnable: boolean
}
export const SubmitButton = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, isEnable }) => isEnable ? theme.colors.contrast : theme.colors.disabledContrast};
    width: 85%;
    justify-content: center;
    align-items: center;
    padding:  3%;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
    margin-top: 5%;
    align-self: center;
`
export const SubmitLabel = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    color: ${({ theme }) => theme.colors.backgroundColor};
    font-weight: 700;
`


export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.alert};
    align-self: flex-start;
    margin-left: 10%;
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;

`