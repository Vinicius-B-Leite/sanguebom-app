import styled from 'styled-components/native';


type Props = {
    selected: boolean
}
export const Container = styled.TouchableOpacity<Props>`
    background-color: ${({theme, selected}) => selected ? theme.colors.contrast_100 : theme.colors.contrast_20};
    width: ${({theme}) => theme.vw * 0.1}px;
    height: ${({theme}) => theme.vw * 0.1}px;
    margin: ${({theme}) => theme.vw * 0.02}px ${({theme}) => theme.vw * 0.02}px;
    justify-content: center;
    align-items: center;
    border-radius: ${({theme}) => theme.borderRadius.xsm}px;
`;

export const Name = styled.Text<Props>`
    font-size: ${({theme}) => theme.fontSize.md}px;
    color: ${({theme, selected}) => selected ? theme.colors.text_200 : theme.colors.text_100};
`
