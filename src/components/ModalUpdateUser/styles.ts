import styled from "styled-components/native";


export const Main = styled.View`
    background-color:${({theme}) => theme.colors.background_100};
    height: ${({theme}) => theme.vh * 0.4}px;
    border-top-left-radius: ${({theme}) => theme.borderRadius.sm}px;
    border-top-right-radius: ${({theme}) => theme.borderRadius.sm}px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    padding: 5% ;
`

export const Title = styled.Text`
    font-size: ${({theme}) => theme.fontSize.md}px;
    color: ${({theme}) => theme.colors.text_200};
    font-weight: 600;
    text-align: center;
    margin-bottom: 5%;
    `

export const InputArea = styled.View`
    width: 100%;
    height: 20%;
    margin-bottom: 5%;
`