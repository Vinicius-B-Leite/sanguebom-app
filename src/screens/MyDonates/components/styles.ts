import styled from 'styled-components/native';

export const DonatesListTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    font-weight: 500;
`

export const DonateItemContainer = styled.View`
    background-color: ${({ theme }) => theme.type === 'dark' ? theme.colors.darkContrast : theme.colors.lightContrast};
    /* width: 100%; */
    margin-top: ${({ theme }) => theme.vh * 0.02}px;
    padding: ${({ theme }) => theme.vh * 0.02}px ${({ theme }) => theme.vh * 0.02}px;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
`

export const DonateItemBloodCollectorName = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;   
`

export const DonateItemDate = styled(DonateItemBloodCollectorName)`
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.sm}px;   
`

export const BlockDonateContainer = styled.View`
    height: ${({ theme }) => theme.vh * 0.4}px;
    justify-content: space-evenly;
    align-items: center;
`

export const BlockDonateText = styled.Text`
    color: ${({ theme }) => theme.colors.contrast_100};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    font-weight: 700;
`