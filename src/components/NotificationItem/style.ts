import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.colors.questionBackgroundColor};
    margin: ${({theme}) => theme.vw * 0.05}px 0px;
    padding: ${({theme}) => theme.vw * 0.05}px ${({theme}) => theme.vw * 0.03}px;
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
`;


export const Circle = styled.View`
    width: ${({ theme }) => theme.vw * 0.12}px;
    height: ${({ theme }) => theme.vw * 0.12}px;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    background-color: ${({theme}) => theme.colors.contrast};
`

export const Right = styled.View`
    max-width: 85%;
    margin-left: 5%;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;
    font-weight: 600;
`

export const Description = styled(Title)`
    font-size: ${({theme}) => theme.fontSize.sm}px;
    font-weight: 400;

`