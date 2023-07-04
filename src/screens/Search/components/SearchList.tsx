import React from 'react';
import { View, FlatList } from 'react-native';
import * as S from './styles'
import { baseURL } from '../../../api';
import { HospitalType } from '../../../types/HospitalType';



type Props = {
    searchedBloodCollectors: HospitalType[] | undefined,
    handleClickSearchedBloodCollector: (item: HospitalType) => void
}

const SearchList: React.FC<Props> = ({ searchedBloodCollectors, handleClickSearchedBloodCollector }) => {

    return (
        <View>
            <FlatList
                data={searchedBloodCollectors}
                renderItem={({ item, index }) => index < 3 ?
                    <S.SuggestContainer onPress={() => handleClickSearchedBloodCollector(item)}>
                        <S.SuggestItemAvatar source={{ uri: `${baseURL}${item.imageURL}` }} />
                        <S.SuggestItemName>{item.username}</S.SuggestItemName>
                    </S.SuggestContainer> : <></>
                }
            />
        </View>
    )
}

export default SearchList;