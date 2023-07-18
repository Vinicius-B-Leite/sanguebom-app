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
        <FlatList
            showsVerticalScrollIndicator={false}
            data={donates?.donates}
            keyExtractor={(_, i) => String(i)}
            ListHeaderComponent={() => <S.DonatesListTitle>Doações realizadas</S.DonatesListTitle>}
            renderItem={({ item }) => <DonateItem donate={item} />}
            ListEmptyComponent={() => <S.BlockDonateText>Nenhuma doação foi realizada</S.BlockDonateText>}
        />
    )
}

export default DonatesList;