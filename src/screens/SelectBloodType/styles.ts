import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_100};
`;



export const Main = styled.View`
    flex: 1;
    align-items: center;
    padding-top: 7%;
`
export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast_100};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg}px;
    text-align: center;
`

type Props = {
    isEnable: boolean
}
export const NextBtn = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, isEnable}) => isEnable ? theme.colors.contrast_100 : theme.colors.contrast_200 };
    width: 85%;
    justify-content: center;
    align-items: center;
    padding: 3%;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
`
export const NextLabel = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.md}px;
    color: ${({ theme }) => theme.colors.background_100};
    font-weight: 700;
`