import styled from 'styled-components/native';
import { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.fontSize.lg}px;
    font-weight: 700;
    text-align: center;
    margin-vertical: 7%;
`


export const Form = styled.View`
    flex: 1;
    padding: 0% 7%;
`
export const InputArea = styled.View`
    width: 100%;
    height: ${({ theme }) => theme.vh * 0.07}px;
    margin-bottom: 5% ;
    align-self: center;
`

type Props = {
    isEnable: boolean
}
export const SubmitButton = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, isEnable }) => isEnable ? theme.colors.contrast : theme.colors.disabledContrast};
    width: 100%;
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


export const DropdownItem = styled.Text`
    ${({theme}) => css`
        font-size: ${theme.fontSize.xxsm}px;
        color: ${theme.colors.text};
        margin-bottom: ${theme.vh * 0.009}px;
    `}
`