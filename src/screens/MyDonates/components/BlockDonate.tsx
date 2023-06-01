import React from 'react';
import BlockDonateVector from '../../../assets/block donate.svg'
import * as S from './styles'


type Props = {
    daysWaitToDonate: number
}
const BlockDonate: React.FC<Props> = ({ daysWaitToDonate }) => {
    return (
        <S.BlockDonateContainer>
            <BlockDonateVector />
            <S.BlockDonateText>{`${daysWaitToDonate > 1 ? 'Faltam' : 'Falta'} ${daysWaitToDonate} ${daysWaitToDonate > 1 ? 'dias' : 'dia'} para você estar apto(a) a doar novamente`}</S.BlockDonateText>
        </S.BlockDonateContainer>
    )
}

export default BlockDonate;