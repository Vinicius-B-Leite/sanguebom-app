import styled from 'styled-components/native';



type Props = {
    bg: 'darkContrast' | 'white'
}
export const Container = styled.TouchableOpacity<Props>`
    flex: 1;
    border-radius: ${({ theme }) => theme.borderRadius.xsm}px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, bg }) => bg === 'darkContrast' ? theme.colors.contrast_200 : theme.colors.background_100};
`;

export const Label = styled.Text<Props>`
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;
    font-weight: 700;
    color: ${({ theme, bg }) => bg === 'darkContrast' ?  theme.colors.background_100 : theme.colors.contrast_100};
`