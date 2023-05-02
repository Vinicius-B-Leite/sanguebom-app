import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import * as S from './style'
import { StackScreenProps } from '@react-navigation/stack';
import { SearchScreenParamsList } from '../../routes/models';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

type Nav = StackScreenProps<SearchScreenParamsList, 'CreateAlert'>

const CreateAlert: React.FC<Nav> = ({ navigation }) => {

    const { colors, icons } = useTheme()

    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({ display: 'none' })
    }, [])

    return (
        <S.Container>
            <S.GoBack onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={icons.sm} color={colors.contrast} />
                <S.GoBackLabel>Criar Alerta</S.GoBackLabel>
            </S.GoBack>
        </S.Container>
    )
}

export default CreateAlert;