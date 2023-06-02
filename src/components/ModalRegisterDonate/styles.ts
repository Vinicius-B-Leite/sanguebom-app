import styled from 'styled-components/native';
import { css } from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    width: 90%;
    height: 50%;
    padding: 5%;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
    overflow: hidden;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.fontSize.md}px;
    font-weight: 600;
`
export const Section = styled.View`
    margin: 5% 0%;
`
export const SectionTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    font-weight: 400;
    margin-bottom: 3%;
`
export const DropDownArea = styled.View`
    width: 95%;
    align-self: flex-end;
`
