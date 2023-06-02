import styled from 'styled-components/native';
import { css } from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${({theme}) => theme.vw * 0.03}px;
`;

export const Avatar = styled.Image`
    width: ${({ theme }) => theme.vw * 0.1}px;
    height: ${({ theme }) => theme.vw * 0.1}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
`

export const BloodCollectorName = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 5%;
`


export const DatePickerArea = styled.TouchableOpacity`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.text};
    align-items: center;
    width: 93%;
    align-self: flex-end;
    
`
export const Date = styled.Text`
    ${({theme}) => css`
        color: ${theme.colors.text};
        font-size: ${theme.fontSize.xxsm}px;
        margin-left: 3%;
    `}
`


export const SubmitArea = styled.View`
    height: ${({theme}) => theme.vh * 0.06}px;
    margin-top: 6%;
`
