import styled from "styled-components/native";


type ItemContainerProps = { selected: boolean }
export const ItemContainer = styled.TouchableOpacity<ItemContainerProps>`
    background-color: ${({ theme, selected }) => theme.colors[selected ? 'contrast' : 'backgroundColorSecond']};
    height: ${({ theme }) => theme.vh * 0.05}px;
    padding: ${({ theme }) => theme.vw * 0.02}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    justify-content: center;
    align-items: center;
    margin: 0px ${({ theme }) => theme.vw * 0.01}px;
`
export const ItemLabel = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.sm}px;
    font-weight: 700    ;
`