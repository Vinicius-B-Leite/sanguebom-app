import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_100};
`;

export const Main = styled.View`
    padding: 5%;
    flex: 1;
`

export const OpenModalBtn = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.contrast_100};
    padding: 5%;
    align-items: center;
    justify-content: center;
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
`
export const OpenModalTxt = styled.Text`
    color: ${({ theme }) => theme.colors.oppositeContrast};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    font-weight: 600;
`