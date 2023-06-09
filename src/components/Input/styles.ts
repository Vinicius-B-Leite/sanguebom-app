import styled from 'styled-components/native';


type Props = {
    isFocused: boolean,
    hasLeftIcon: boolean
    h?: number
}


export const InputArea = styled.View`
    flex: 1;
`
export const Container = styled.View<Props>`
    width: 100%;
    height: ${({ theme, h }) => h || theme.vh * 0.07}px;
    background-color: ${({ theme, isFocused }) => isFocused ? theme.colors.contrast_20 : theme.colors.contrast_10 };
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    flex-direction: row;
    padding: 1% 2%;
    align-items: center;
    border-width: ${({ isFocused }) => isFocused ? '1px' : '0px'};
    border-color: ${({ isFocused, theme }) => isFocused ? theme.colors.contrast_100 : 'none'};
`;

export const TxtInput = styled.TextInput`
    flex: 1;
    padding: 0% 2%;
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
    color: ${({ theme }) => theme.colors.text_200};
`


export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.contrast_200};
    align-self: flex-start;
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;
`