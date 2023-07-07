import React from 'react';
import { View } from 'react-native';
import * as S from './styles'

type Props = {
    children: React.ReactNode,
    bg: 'darkContrast' | 'white',
    onClick: () => void
}
const ComunButton: React.FC<Props> = ({ children, bg, onClick }) => {
    return (
        <S.Container testID='containerView' bg={bg} onPress={onClick} >
            <S.Label bg={bg} >{children}</S.Label>
        </S.Container>
    )
}

export default ComunButton;