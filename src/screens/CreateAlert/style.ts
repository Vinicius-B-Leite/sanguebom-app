import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1 ;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export const GoBack = styled.TouchableOpacity`
    margin: 5%;
    align-items: center;
    flex-direction: row;
`
export const GoBackLabel = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-weight: 700;
    font-size: ${({theme}) => theme.fontSize.md}px;
    margin-left: 5%;
`
