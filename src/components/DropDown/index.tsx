import React, { useState } from 'react';
import { FlatList, TouchableOpacity , StyleProp, ViewStyle} from 'react-native';
import * as S from './styled'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

interface Props<T> extends ViewStyle{
    placeholder: string,
    data: T[] | undefined,
    renderItem: React.FC<{ item: T }>,
    onSelect: (item: T) => void,
    value: string | undefined
} 

function DropDown<T>({ data, placeholder, renderItem, onSelect, value , ...rest}: Props<T>) {

    const { colors, icons } = useTheme()
    const [showData, setShowData] = useState(false)

    const handleSelect = (item: T) => {
        onSelect(item)
        setShowData(false)
    }

    return (
        <S.Container style={rest}>
            <S.SelectBtn onPress={() => setShowData(old => !old)} isSelecting={showData}>
                <S.SelectTxt numberOfLines={1}>{value || placeholder}</S.SelectTxt>
                <AntDesign
                    testID='arrowIcon'
                    name={showData ? 'up' : 'down'}
                    size={icons.sm}
                    color={showData ? colors.contrast_100 : colors.text_100}
                />
            </S.SelectBtn>
            {
                showData && data && data?.length > 0 &&
                <S.ListContainer testID='dataList'>
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