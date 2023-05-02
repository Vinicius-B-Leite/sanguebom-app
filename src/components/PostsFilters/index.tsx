import React from 'react';
import { FlatList, View } from 'react-native';
import * as S from './style'


type PostsFiltersProps = {
    onSelected: (filter: string) => void,
    filterSelected: string
}

const filters = ['Recentes', 'Jardim Imperial', 'Cerejeiras', 'Nova Atibaia', 'Jardim dos Pinheiros', 'Alvinópolis  1', 'Alvinópolis 2', 'Caetetuba', 'Jardim Paulista', 'Jardim Maristela 1', 'Jardim Maristela 2', 'Usina', 'Portão']

const PostsFilters: React.FC<PostsFiltersProps> = ({ onSelected, filterSelected }) => {
    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={filters}
                horizontal
                contentContainerStyle={{
                    padding: '5%',
                }}
                renderItem={({ item, index }) => (
                    <S.ItemContainer selected={filterSelected == item} onPress={() => onSelected(item)}>
                        <S.ItemLabel>{item}</S.ItemLabel>
                    </S.ItemContainer>
                )}
            />
        </View>
    )
}

export default PostsFilters;