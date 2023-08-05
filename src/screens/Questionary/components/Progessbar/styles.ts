import styled from "styled-components/native";


export const Container = styled.View`
    width: 100%;
`
export const ProgressBarArea = styled.View`
    position: relative;
    background-color: ${({ theme }) => theme.colors.contrast_10};
    height:${({ theme }) => theme.vh * 0.015}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
`

export const Progress = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.contrast_100};
    width: 10%;
    height:100%;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
`


export const QuestionArea = styled.View`
    flex-direction: row;
    justify-content: space-between ;
    padding: 0.5% 2%;
`
export const QuestionNumber = styled.Text`
    color: ${({theme}) => theme.colors.text_200};
    font-size: ${({theme}) => theme.fontSize.xxxsm}px;
`