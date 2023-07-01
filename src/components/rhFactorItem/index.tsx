import React, { memo } from 'react';
import { View } from 'react-native';
import * as S from './styles'



type Props = {
    selected: boolean,
    rh: string,
    onClick: (rhFactor: string) => void
}
const RhFactorItem: React.FC<Props> = ({ rh, selected, onClick }) => {
    
    return (
        <S.Container selected={selected} onPress={() => onClick(rh)}>
            <S.Name selected={selected}>{rh}</S.Name>
        </S.Container>
    )
}

export default memo(RhFactorItem, (p, n) => Object.is(p, n));