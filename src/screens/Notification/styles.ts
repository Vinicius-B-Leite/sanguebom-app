import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_100};
    `;


export const ListEmptyText = styled.Text`
    color: ${({theme}) => theme.colors.contrast_100};
    font-size: ${({theme}) => theme.fontSize.xsm}px;
`