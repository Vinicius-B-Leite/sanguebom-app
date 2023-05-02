import React, { memo } from 'react';
import * as S from './styles'


type Props = {
    bloodType: string,
    selected: boolean,
    onClick: (bloodType: string) => void
}

const SelectBloodTypeItem: React.FC<Props> = ({ bloodType, selected, onClick }) => {

    return (
        <S.Container selected={selected} onPress={() => onClick(bloodType)}>
            <S.Name selected={selected}>{bloodType}</S.Name>
        </S.Container>
    )
}


//true == no render
//false == render
export default memo(SelectBloodTypeItem, (prv, nxt) => prv.selected === nxt.selected);