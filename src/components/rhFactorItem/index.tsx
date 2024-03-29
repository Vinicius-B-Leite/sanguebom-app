import React, { memo } from 'react';
import * as S from './styles'



type Props = {
    selected: boolean,
    rh: string,
    onClick: (rhFactor: string) => void
}
const RhFactorItem: React.FC<Props> = ({ rh, selected, onClick }) => {
    
    return (
        <S.Container testID='rhContainer' selected={selected} onPress={() => onClick(rh)}>
            <S.Name selected={selected}>{rh}</S.Name>
        </S.Container>
    )
}

export default RhFactorItem