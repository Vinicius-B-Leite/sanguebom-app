import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    position: absolute;
    right: 5%;
    bottom: 5%;
    z-index: 2;
    background-color: ${({theme}) => theme.colors.contrast_100};
    padding: 5%;
    justify-content: center;
    align-items: center;
    border-radius: ${({theme}) => theme.borderRadius.full}px;
`;
