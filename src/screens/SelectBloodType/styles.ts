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
export const IDKMBTButton = styled.TouchableOpacity``
export const IDKMBTLabel = styled.Text`
    text-decoration-line: underline;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.sm}px;
`

type Props = {
    isEnable: boolean
}
export const NextBtn = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, isEnable}) => isEnable ? theme.colors.contrast_100 : theme.colors.disabledContrast };
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