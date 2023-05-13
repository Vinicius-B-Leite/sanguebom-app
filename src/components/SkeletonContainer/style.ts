import styled from 'styled-components/native';



type Props = {
    w?: number,
    h?: number,
    isCircle?: boolean
}

export const Container = styled.View<Props>`
    justify-content: center;
    align-items: center;
    width: ${({ w }) => w ? w + 'px' : '100%'};
    height: ${({ h }) => h ? h + 'px' : '100%'};
    border-radius: ${({ theme, isCircle }) => isCircle ? theme.borderRadius.full : 0}px;
    overflow: hidden;
`;
