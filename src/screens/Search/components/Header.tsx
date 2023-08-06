import React from 'react';
import * as S from './styles'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import AntDesign from '@expo/vector-icons/AntDesign'


type Props = {
    searchInput: string,
    setSeatchInput: (old: string) => void
}
const Header: React.FC<Props> = ({ searchInput, setSeatchInput }) => {
    const navigation = useNavigation()
    const { colors, icons, type } = useTheme()
    return (
        <S.Header>
            <S.GoBack onPress={() => navigation.goBack()}>
                <AntDesign testID='arrowleft' name="arrowleft" size={icons.sm} color={type === 'dark' ? colors.text_100 : colors.background_100} />
            </S.GoBack>
            <S.Input
                placeholder={'Pesquise por um ponto de coleta'}
                placeholderTextColor={colors.text_200}
                value={searchInput}
                onChangeText={setSeatchInput}
            />
        </S.Header>
    )
}

export default Header;