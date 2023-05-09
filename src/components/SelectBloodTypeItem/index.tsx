import React, { memo } from 'react';
import * as S from './styles'


type Props = {
    bloodType: string,
    selected: boolean,
    onClick: (bloodType: string) => void,
    w?: number,
    h?: number
    fs?: number
}

const SelectBloodTypeItem: React.FC<Props> = ({ bloodType, selected, onClick, h, w , fs}) => {

    return (
        <S.Container selected={selected} onPress={() => onClick(bloodType)} w={w} h={h} >
            <S.Name fs={fs} selected={selected}>{bloodType}</S.Name>
        </S.Container>
    )
}


//true == no render
//false == render
export default memo(SelectBloodTypeItem, (prv, nxt) => prv.selected === nxt.selected );