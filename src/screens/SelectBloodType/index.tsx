import React, { useState } from 'react';
import * as S from './styles';
import { StackRootParamsList } from '../../routes/models';
import BloodTypeList from './components/BloodTypeList';
import HeaderGoBack from '../../components/HeaderGoBack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';

type Nav = NavigationProp<StackRootParamsList, 'SelectBloodType'>

const SelectBloodType: React.FC = () => {

    const navigation = useNavigation<Nav>()

    const isUpdatingBloodType = !!(useSelector((state: RootState) => state.user.user))
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
                    onPress={() => bloodTypeSelected.length > 0 &&
                        navigation.navigate('SingUp', { bloodtype: bloodTypeSelected + rhFactorSelected })
                    }
                    isEnable={bloodTypeSelected.length > 0}
                >
                    <S.NextLabel>Avançar</S.NextLabel>
                </S.NextBtn>

            </S.Main>
        </S.Container >
    )
}

export default SelectBloodType;