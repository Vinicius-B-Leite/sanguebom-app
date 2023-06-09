import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;


type SelectBtnProps = {
    isSelecting: boolean
}
export const SelectBtn = styled.TouchableOpacity<SelectBtnProps>`
    width: 100%;
    background-color: ${({ theme, isSelecting }) => isSelecting ? theme.colors.lightContrast : theme.colors.backgroundColor};
    border-color: ${({ theme, isSelecting }) => isSelecting ? theme.colors.contrast : theme.colors.darkText};
    border-width: 0.5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 2% 4%;
`
export const SelectTxt = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-weight: 400;
    max-width: 90%;
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;
`

export const ListContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    border-color: ${({ theme }) => theme.colors.darkText};
    border-width: 0.5px;
    margin: 5% 0%;
    padding:  4%;
    width: 100%;
    max-height: ${({theme}) => theme.vh * 0.17}px;
`