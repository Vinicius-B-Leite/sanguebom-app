import styled from 'styled-components/native';


type Props = {
    isFocused: boolean,
    hasLeftIcon: boolean
}
export const Container = styled.View<Props>`
    flex: 1;
    background-color: ${({ theme, isFocused }) => isFocused ?
     theme.type === 'dark' ? theme.colors.darkContrast : theme.colors.formInputBg 
     : theme.colors.formInputBg};
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    flex-direction: row;
    padding: 1% 2%;
    align-items: center;
    border-width: ${({ isFocused }) => isFocused ? '1px' : '0px'};
    border-color: ${({ isFocused, theme }) => isFocused ? theme.colors.contrast : 'none'};
`;

export const TxtInput = styled.TextInput`
    flex: 1;
    padding: 0% 2%;
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
    color: ${({ theme }) => theme.colors.text};
`
