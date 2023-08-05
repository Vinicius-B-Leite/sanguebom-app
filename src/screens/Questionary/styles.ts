import styled from "styled-components/native";

export const Container = styled.ScrollView`
    background-color: ${({ theme }) => theme.colors.background_100};
    flex: 1;
`

export const Main  = styled.View`
    padding: 5%;
    flex: 1;
    gap: ${({theme}) => theme.vw * 0.05}px;
`