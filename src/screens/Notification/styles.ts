import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.backgroundColor};
    `;

export const Header = styled.View`
    flex-direction: row;
    padding: 5%;
    background-color: ${({theme}) => theme.colors.contrast};
    align-items: center;
`
export const Title = styled.Text`
    font-size: ${({theme}) => theme.fontSize.md}px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.backgroundColor};
    margin-left: 5%;
`
