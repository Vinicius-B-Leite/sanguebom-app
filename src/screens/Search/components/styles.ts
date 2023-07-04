import styled from 'styled-components/native';


export const AlertInfoContainer = styled.View`
    position: absolute;
    bottom: 2%;
    left: 5%;
    right: 5%;
    background-color: ${({ theme }) => theme.colors.contrast_100};
    border-radius: ${({ theme }) => theme.borderRadius.xxsm}px;
    padding: 2% 5%;
    flex-direction: row;
    justify-content: space-between;
`

export const Left = styled.View`
    max-width: 35%;
`
export const BloodCollectorName = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
`
export const Right = styled.View`
    max-width: 60%;
`

export const BloodTypeItem = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.xxxsm}px;
`






export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.communHeaderColor};
    width: 100%;
    padding: 5%;
    flex-direction: row;
`
export const GoBack = styled.TouchableOpacity`
    width: 12%;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`
export const Input = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.contrast_20};
    width: 85%;
    padding: 0% 5%;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    color: ${({ theme }) => theme.colors.background_100};
`




export const SuggestContainer = styled.TouchableOpacity`
    flex-direction: row;
    border-top-width: 1px;
    border-top-color: ${({ theme }) => theme.colors.contrast_10};
    background-color: ${({ theme }) => theme.colors.contrast_100};
    padding: 2% 5%;
    align-items: center;
`

export const SuggestItemAvatar = styled.Image`
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    width: ${({ theme }) => theme.vw * 0.1}px;
    height: ${({ theme }) => theme.vw * 0.1}px;
`
export const SuggestItemName = styled.Text`
    color: ${({ theme }) => theme.colors.background_100};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    margin-left: 5%;
`

