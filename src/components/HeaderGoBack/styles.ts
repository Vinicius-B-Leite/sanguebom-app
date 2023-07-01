import styled from 'styled-components/native';


type Props = {
    themeBg: 'transparent' | 'contrast',
}
export const Header = styled.View<Props>`
    flex-direction: row;
    padding: 5%;
    background-color: ${({ theme, themeBg }) => themeBg === 'contrast' ? theme.colors.communHeaderColor : theme.colors.background_100};
    align-items: center;
    border-bottom-width: ${({ theme }) => theme.type === 'dark' ? '1px' : '0px'};
    border-bottom-color:  ${({ theme }) => theme.type === 'dark' ? theme.colors.contrast_100 : 'none'};
`
export const Title = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.md}px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.oppositeContrast};
    margin-left: 5%;
`
