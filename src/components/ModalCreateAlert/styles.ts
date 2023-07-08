import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
`;


export const Main = styled.View`
    background-color: ${({ theme }) => theme.colors.background_100};
    padding: 5%;
    border-radius: ${({theme}) => theme.borderRadius.xsm}px;
    `

export const Title = styled.Text`
    color: ${({ theme }) => theme.type === 'dark' ? theme.colors.text_100 : theme.colors.contrast_100};
    font-size: ${({ theme }) => theme.fontSize.md}px;
    font-weight: 700;
    `

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    `

export const SectionTitle = styled.Text`
    margin: 2% 0%;
    color: ${({ theme }) => theme.type === 'dark' ? theme.colors.text_100 : theme.colors.contrast_100};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
`

export const BloodTypesContainer = styled.View`
    height: ${({ theme }) => theme.vh * 0.2}px;
`

export const InputArea = styled.View`
    height: 10%;
`

export const SubmitButton = styled.TouchableOpacity`
    padding: 3% 0%;
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
    margin: 5% 0%;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.contrast_100};
    margin-top: 15%;
`

export const SubmitLabel = styled.Text`
    color: ${({ theme }) => theme.colors.oppositeContrast};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    font-weight: 700;
`