import styled from "styled-components/native";

export const QuestionContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.contrast_10};
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 5%;
`
export const QuestionTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;
    padding-bottom: ${({ theme }) => theme.vh * 0.02}px;
`

type Props = {
    selected: boolean
}

export const AnswareArea = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, selected}) => selected ? theme.colors.contrast_20 : theme.colors.contrast_10};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4%;
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    margin-top: 4%;
    border-width: ${({ theme, selected}) => selected ? '1px' : '0px'};
    border-color: ${({ theme, selected}) => selected ? theme.colors.contrast_100 : 'none'};

`
export const AnswareLabel = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-size: ${({ theme }) => theme.fontSize.xxsm}px;
`