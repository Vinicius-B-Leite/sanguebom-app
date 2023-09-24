import styled from 'styled-components/native';


type StyledProps = {
    type: 'sucess' | 'error' | 'warning'
}


export const Container = styled.View<StyledProps>`
    background-color: ${({ theme, type }) => theme.colors.toast[type]};
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 2.5% 5%;
    flex-direction: row;
    gap: ${({ theme }) => theme.vw * 0.02}px;
`

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.oppositeContrast};
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
    font-weight: 500;
`