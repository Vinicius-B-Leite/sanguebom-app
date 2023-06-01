import React from 'react';
import * as S from './styles'
import { Donate } from '../../../types/MyDonatesTypes';

type Props = {
    donate: Donate
}
const DonateItem: React.FC<Props> = ({ donate }) => {

    const day = String(new Date(donate.date).getDate()).padStart(2, '0');
    const month = String(new Date(donate.date).getMonth() + 1).padStart(2, '0');
    const year = new Date(donate.date).getFullYear();

    return (
        <S.DonateItemContainer>
            <S.DonateItemBloodCollectorName>{donate.bloodCollectors.username}</S.DonateItemBloodCollectorName>
            <S.DonateItemDate>{`${day}/${month}/${year}`}</S.DonateItemDate>
        </S.DonateItemContainer>
    )
}

export default DonateItem;