import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_100};
`;


type SelectBtnProps = {
    isSelecting: boolean
}
export const SelectBtn = styled.TouchableOpacity<SelectBtnProps>`
    width: 100%;
    background-color: ${({ theme, isSelecting }) => isSelecting ? theme.colors.contrast_10 : theme.colors.background_100};
    border-color: ${({ theme, isSelecting }) => isSelecting ? theme.colors.contrast_100 : theme.colors.text_100};
    border-width: 0.5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 2% 4%;
`
export const SelectTxt = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-weight: 400;
    max-width: 90%;
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;
`

export const ListContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.background_100};
    border-color: ${({ theme }) => theme.colors.text_100};
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
    border-width: 0.5px;
    margin: 5% 0%;
    padding:  4%;
    width: 100%;
    max-height: ${({theme}) => theme.vh * 0.17}px;
`