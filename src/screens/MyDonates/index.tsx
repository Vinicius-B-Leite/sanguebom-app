import React, { useState } from 'react';
import * as S from './styles'
import HeaderGoBack from '../../components/HeaderGoBack';
import { useQuery } from '@tanstack/react-query';
import { getMyDonates } from '../../api/getMyDonates';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import DonatesList from './components/DonatesList';
import BlockDonate from './components/BlockDonate';
import { useTheme } from 'styled-components/native';
import ModalRegisterDonate from '../../components/ModalRegisterDonate';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';



const MyDonates: React.FC = () => {

    const navigation = useNavigation()
    const theme = useTheme()
    const user = useSelector((state: RootState) => state.user.user)
    const { type } = useTheme()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const { data, isLoading } = useQuery(
        ['donates'],
        () => getMyDonates({ uid: user!.uid }),
    )


    return (
        <S.Container>
            <HeaderGoBack
                title='Minhas doações'
                goBack={() => navigation.goBack()}
                theme={type === 'dark' ? 'transparent' : 'contrast'}
            />
            {
                data && (data.waitDaysToDonate > 0) &&
                <BlockDonate daysWaitToDonate={data.waitDaysToDonate} />
            }
            <S.Main>
                <DonatesList
                    donates={data}
                />

                {isLoading && <ActivityIndicator style={{ marginTop: '5%' }} color={theme.colors.contrast_100} size={theme.icons.sm} />}
                {
                    data && (data.waitDaysToDonate <= 0) &&

                    <S.OpenModalBtn onPress={() => setIsModalVisible(true)}>
                        <S.OpenModalTxt>Cadastrar doação</S.OpenModalTxt>
                    </S.OpenModalBtn>
                }


                <ModalRegisterDonate visible={isModalVisible} closeModal={() => setIsModalVisible(false)} />

            </S.Main>
        </S.Container>
    )
}

export default MyDonates;