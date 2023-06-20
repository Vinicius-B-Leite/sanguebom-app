import styled from 'styled-components/native';


type Props = {
    selected: boolean,
    w?: number,
    h?: number
}
export const Container = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, selected }) => selected ? theme.colors.contrast_100 : theme.colors.contrast_20};
    width: ${({ theme, w }) => w ? w : theme.vw * 0.4}px;
    height: ${({ theme, h }) => h ? h : theme.vw * 0.2}px;
    margin: ${({ theme }) => theme.vw * 0.02}px ${({ theme }) => theme.vw * 0.02}px;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
`;

interface P extends Props {
    fs?: number
}
export const Name = styled.Text<P>`
    font-size: ${({ theme, fs }) => fs ? fs : theme.fontSize.md}px;
    color: ${({ theme, selected }) => selected ? theme.colors.text_200 : theme.colors.text_100};
`
