import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_100};
    padding: 7%;
`
export const GoBack = styled.TouchableOpacity`
    align-self: flex-end;
    padding: 2%;
`
export const Title = styled.Text`
    color: ${({theme}) => theme.colors.contrast_100};
    font-size: ${({theme}) => theme.fontSize.lg}px;
    font-weight: bold;
    margin-bottom: 3%;
`
export const SubTitle = styled.Text`
    color: ${({theme}) => theme.colors.text_100};
    font-size: ${({theme}) => theme.fontSize.xsm}px;
`
export const ImageFeedback = styled.Image`
    width: 100%;
    height: 68%;
    
`