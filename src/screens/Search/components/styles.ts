import styled from 'styled-components/native';


export const AlertInfoContainer = styled.View`
    position: absolute;
    bottom: 2%;
    left: 5%;
    right: 5%;
    background-color: ${({ theme }) => theme.colors.contrast_100};
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 2% 5%;
    flex-direction: row;
    justify-content: space-between;
`

export const Left = styled.View`
    max-width: 35%;
`
export const BloodCollectorName = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
`
export const Right = styled.View`
    max-width: 60%;
`

export const BloodTypeItem = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
`