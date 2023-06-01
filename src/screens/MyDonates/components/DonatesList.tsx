import React from 'react';
import { FlatList, View } from 'react-native';
import { Donate, MyDonatesTypes } from '../../../types/MyDonatesTypes';
import DonateItem from './DonateItem';
import * as S from './styles'

type Props = {
    donates: MyDonatesTypes | undefined
}

const DonatesList: React.FC<Props> = ({ donates }) => {
    return (
        <>
            <S.DonatesListTitle>Doações realizadas</S.DonatesListTitle>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={donates?.donates}
                renderItem={({ item }) => <DonateItem donate={item} />}
            />
        </>

    )
}

export default DonatesList;