import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
`;

export const CloseModal = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundOpacity};
    z-index: -1;
`