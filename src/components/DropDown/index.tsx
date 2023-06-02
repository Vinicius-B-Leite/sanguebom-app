import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as S from './styled'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

interface Props<T> {
    placeholder: string,
    data: T[] | undefined,
    renderItem: React.FC<{ item: T }>,
    onSelect: (item: T) => void,
    value: string | undefined
}

function DropDown<T>({ data, placeholder, renderItem, onSelect, value }: Props<T>) {

    const { colors, type, icons } = useTheme()
    const [showData, setShowData] = useState(false)

    const handleSelect = (item: T) => {
        onSelect(item)
        setShowData(false)
    }

    return (
        <S.Container>
            <S.SelectBtn onPress={() => setShowData(old => !old)} isSelecting={showData}>
                <S.SelectTxt numberOfLines={1}>{value || placeholder}</S.SelectTxt>
                <AntDesign name={showData ? 'up' : 'down'} size={icons.sm} color={showData ? colors.contrast : colors.text} />
            </S.SelectBtn>
            {
                showData && data &&
                <S.ListContainer>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => handleSelect(item)}>{renderItem({ item })}</TouchableOpacity>}
                    />
                </S.ListContainer>
            }
        </S.Container>
    )
}

export default DropDown;