import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.contrast};
    flex: 1;
    align-items: center;
    padding-top: 30%;
`;

export const ImageCircle = styled.View`
    width: ${({theme}) => theme.vw * 0.5}px;
    height: ${({theme}) => theme.vw * 0.5}px;
    border-radius: ${({theme}) => theme.borderRadius.full}px;
    background-color: ${({theme}) => theme.colors.darkContrast};
    margin: 5% 0%;
`

export const ButtonContainer = styled.View`
    height: 9%;
    margin: 3% 0%;
    width: 80%;
`