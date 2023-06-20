import React, { useState } from 'react';
import * as S from './styles';
import type { StackScreenProps } from '@react-navigation/stack'
import { StackRootParamsList } from '../../routes/models';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import BloodTypeList from './components/BloodTypeList';
import HeaderGoBack from '../../components/HeaderGoBack';

type Nav = StackScreenProps<StackRootParamsList, 'SelectBloodType'>

const SelectBloodType: React.FC<Nav> = ({ navigation }) => {
    
    const [bloodTypeSelected, setBlooadTypeSelected] = useState('')
    const [rhFactorSelected, setRhFactorSelected] = useState('+')

    return (
        <S.Container>

            <HeaderGoBack goBack={() => navigation.goBack()} theme='transparent' />

            <S.Main>
                <S.Title>SELECIONE SEU TIPO SANGUÍNEO</S.Title>

                <BloodTypeList
                    bloodTypeSelected={bloodTypeSelected}
                    rhFactorSelected={rhFactorSelected}
                    setBloodTypeSelected={setBlooadTypeSelected}
                    setRhFactorSelected={setRhFactorSelected}
                />

                <S.NextBtn
                    onPress={() => bloodTypeSelected.length > 0 && navigation.navigate('SingUp', { bloodtype: bloodTypeSelected + rhFactorSelected })}
                    isEnable={bloodTypeSelected.length > 0}
                >
                    <S.NextLabel>Avançar</S.NextLabel>
                </S.NextBtn>

            </S.Main>
        </S.Container >
    )
}

export default SelectBloodType;