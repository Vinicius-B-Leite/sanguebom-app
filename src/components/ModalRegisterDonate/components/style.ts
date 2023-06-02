import styled from 'styled-components/native';

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