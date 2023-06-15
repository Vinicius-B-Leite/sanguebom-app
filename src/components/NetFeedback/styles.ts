import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    ${({ theme }) => css`
        width: ${theme.vw}px;
        background-color: ${theme.colors.text_50};
        height: ${theme.vh * 0.06}px;
        justify-content: center;
        align-items: center;
    `}
`;

export const Label = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.fontSize.xxxsm}px;
        color: ${theme.colors.text_200};
    `}
`
