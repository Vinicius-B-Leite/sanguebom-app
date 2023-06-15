import styled from 'styled-components/native';


export const Header = styled.View`
    flex-direction: row;
    padding: 0% 5%;
    height: ${({ theme }) => theme.vh * 0.05}px;
    align-items: center;
    margin: 2% 0%
`
export const Avatar = styled.Image`
    width: 12%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.full}px;
    `
export const Username = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-size: ${({ theme }) => theme.fontSize.xsm}px;
    margin-left: 3%;
    `


export const Footer = styled.View`
    padding: 0% 5%;
`
export const Deatils = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2% 0%;
`
export const ComunText = styled.Text`
    color: ${({ theme }) => theme.colors.text_200};
    font-size: ${({ theme }) => theme.fontSize.sm}px;
`
export const Description = styled(ComunText)``

export const ReadMoreBTN = styled.TouchableOpacity`
    
`
export const ReadMore = styled(ComunText)`
    text-decoration-line: underline;
`
