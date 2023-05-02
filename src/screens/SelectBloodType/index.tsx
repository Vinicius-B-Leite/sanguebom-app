import React, { useState, useCallback } from 'react';
import * as S from './styles';
import type { StackScreenProps } from '@react-navigation/stack'
import { StackRootParamsList } from '../../routes/models';
import AntDesign  from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import { FlatList, View } from 'react-native';
import SelectBloodTypeItem from '../../components/SelectBloodTypeItem';
import RhFactorItem from '../../components/rhFactorItem';

type Nav = StackScreenProps<StackRootParamsList, 'SelectBloodType'>
const bloodTypes = ['A', 'B', 'O', 'AB']
const rhFactor = ['+', '-']

const SelectBloodType: React.FC<Nav> = ({ navigation }) => {

    const theme = useTheme()
    const [bloodTypeSelected, setBlooadTypeSelected] = useState('')
    const [rhFactorSelected, setRhFactorSelected] = useState('+')

    const seletecBloodType = useCallback((bloodType: string) => {
        setBlooadTypeSelected(bloodType)
    }, [])
    const seletecRhFactor = useCallback((rhFactor: string) => {
        setRhFactorSelected(rhFactor)
    }, [])

    return (
        <S.Container>
            <S.GoBack onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={theme.icons.sm} color={theme.colors.contrast} />
            </S.GoBack>

            <S.Main>
                <S.Title>SELECIONE SEU TIPO SANGUÍNEO</S.Title>

                <S.IDKMBTButton>
                    <S.IDKMBTLabel>Não sei meu tipo sanguíneo</S.IDKMBTLabel>
                </S.IDKMBTButton>

                <View style={{ height: theme.vh * 0.4 }}>
                    <FlatList
                        data={bloodTypes}
                        contentContainerStyle={{ paddingTop: theme.vh * 0.05, justifyContent: 'center' }}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <SelectBloodTypeItem
                                selected={item === bloodTypeSelected}
                                bloodType={item}
                                onClick={(bloodType) => seletecBloodType(bloodType)}
                            />
                        )
                        }
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    <FlatList
                                        data={rhFactor}
                                        numColumns={2}
                                        style={{ alignItems: 'center' }}
                                        renderItem={({ item }) => (
                                            <RhFactorItem
                                                selected={item === rhFactorSelected}
                                                rh={item}
                                                onClick={(rhF) => seletecRhFactor(rhF)}
                                            />
                                        )}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>

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