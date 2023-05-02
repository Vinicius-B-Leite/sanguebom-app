import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`
export const Avatar = styled.Image`
    width: ${({theme})=> theme.vh * 0.2}px;
    height: ${({theme})=> theme.vh * 0.2}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    margin-top: 5%;
    align-self: center;
`
export const Username = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
    text-align: center;
`
export const ItemContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.questionBackgroundColor};
    width: 90%;
    margin: 2% 0;
    padding: 0% 2%;
    flex-direction: row;
    height:${({theme})=> theme.vh * 0.07}px;
    border-radius: ${({theme}) => theme.borderRadius.xxsm}px;
    align-items: center;
    align-self: center;
`
export const ItemBackgroundIcon = styled.View`
    background-color: ${({ theme }) => theme.colors.optionsBg};
    flex-direction: row;
    align-items: center;
    width: ${({theme})=> theme.vw * 0.08}px;
    height: ${({theme})=> theme.vw * 0.08}px;
    border-radius: ${({theme}) => theme.borderRadius.full}px;
    justify-content: center;
`
export const ItemLabel = styled.Text`
    margin-left: 2%;
    font-size: ${({theme}) => theme.fontSize.sm}px;
    color: ${({theme}) => theme.colors.text};
`
