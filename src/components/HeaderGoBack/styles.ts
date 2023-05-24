import styled from 'styled-components/native';


type Props = {
    themeBg: 'transparent' | 'contrast',
}
export const Header = styled.View<Props>`
    flex-direction: row;
    padding: 5%;
    background-color: ${({ theme, themeBg }) => themeBg === 'contrast' ? theme.colors.contrast : theme.colors.backgroundColor};
    align-items: center;
`
export const Title = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.md}px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.backgroundColor};
    margin-left: 5%;
`
