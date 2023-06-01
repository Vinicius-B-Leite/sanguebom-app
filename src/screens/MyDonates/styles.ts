import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export const Main = styled.View`
    padding: 5%;
    flex: 1;
`