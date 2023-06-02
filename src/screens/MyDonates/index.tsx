import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles'
import HeaderGoBack from '../../components/HeaderGoBack';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { useQuery } from '@tanstack/react-query';
import { getMyDonates } from '../../api/getMyDonates';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import DonatesList from './components/DonatesList';
import BlockDonate from './components/BlockDonate';
import { useTheme } from 'styled-components/native';
import ModalRegisterDonate from '../../components/ModalRegisterDonate';


type Nav = StackScreenProps<StackHomeParamsList, 'MyDonates'>

const MyDonates: React.FC<Nav> = ({ navigation }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const { type } = useTheme()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const { data } = useQuery(
        ['donates'],
        () => getMyDonates({ token: user?.token ?? '', uid: user?.uid ?? '' }),
    )


    return (
        <S.Container>
            <HeaderGoBack title='Minhas doações' goBack={() => navigation.goBack()} theme={type === 'dark' ? 'transparent' : 'contrast'} />
            {/* {
                data?.waitDaysToDonate && data.waitDaysToDonate > 0 &&
                <BlockDonate daysWaitToDonate={data.waitDaysToDonate} />
            } */}
            <S.Main>
                <DonatesList
                    donates={data}
                />

                <S.OpenModalBtn onPress={() => setIsModalVisible(true)}>
                    <S.OpenModalTxt>Cadastrar doação</S.OpenModalTxt>
                </S.OpenModalBtn>

                <ModalRegisterDonate visible={isModalVisible} closeModal={() => setIsModalVisible(false)} />
            </S.Main>
        </S.Container>
    )
}

export default MyDonates;