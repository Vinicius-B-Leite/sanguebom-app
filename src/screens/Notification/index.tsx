import React from 'react';
import { TouchableOpacity, FlatList, Text } from 'react-native';
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { useQuery } from '@tanstack/react-query';
import { getNotification } from '../../api/getNotification';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import NotificationItem from '../../components/NotificationItem';



type Nav = StackScreenProps<StackHomeParamsList, 'Notification'>

const Notification: React.FC<Nav> = ({ navigation }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const theme = useTheme()

    const { data } = useQuery(
        ['notification'],
        () => getNotification({ token: user?.token ?? '', uid: user?.uid ?? '' }),
        {
            onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
        }
    )



    return (
        <S.Container>
            <S.Header>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={theme.icons.sm} color={theme.colors.backgroundColor} />
                </TouchableOpacity>
                <S.Title>Notificações</S.Title>
            </S.Header>

            <FlatList
                contentContainerStyle={{padding: '5%'}}
                data={data}
                renderItem={({ item }) => <NotificationItem notification={item} />}
            />
        </S.Container>
    )
}

export default Notification;