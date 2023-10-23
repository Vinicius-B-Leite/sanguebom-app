import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding-vertical: 5%;
    padding-horizontal: 10%;
`
export const GoBack = styled.TouchableOpacity``

export const Top = styled.View`
`
export const Title = styled.Text`
    padding-top: 10%;
    font-size: ${({ theme }) => theme.fontSize.lg}px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.contrast_100};

`
export const Subtitle = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
    color: ${({ theme }) => theme.colors.text_100};
    text-align: justify;
`
export const Image = styled.Image`
    width: 100%;
    height: ${({ theme }) => theme.vh / 2}px;
    align-self: center;
    margin-top: 10%;
`


export const Bottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: auto;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_200};
`
export const IndexWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`


type IndexProps = {
    isSelected: boolean
}
export const Index = styled.View<IndexProps>`
    width: ${({ theme }) => theme.vw / 30}px;
    height: ${({ theme }) => theme.vw / 30}px;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.contrast_100 : theme.colors.text_100};
`
export const NextPage = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.contrast_100};
    padding: 4%;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
`