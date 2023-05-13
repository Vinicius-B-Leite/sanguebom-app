import React, { useEffect } from 'react';
import { TouchableOpacity, FlatList, Text } from 'react-native';
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { useQuery } from '@tanstack/react-query';
import { getNotification } from '../../api/getNotification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import NotificationItem from '../../components/NotificationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNotificationLength } from '../../feature/notification/notificationSlice';



type Nav = StackScreenProps<StackHomeParamsList, 'Notification'>

const Notification: React.FC<Nav> = ({ navigation }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const theme = useTheme()
    const dispatch = useDispatch()

    const { data } = useQuery(
        ['notification'],
        () => getNotification({ token: user?.token ?? '', uid: user?.uid ?? '' }),
        {
            onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data),
            onSuccess: async (res) => await AsyncStorage.setItem('@lastedNotificationReadID', res[0].id)
        }
    )

    useEffect(() => {
        dispatch(setNotificationLength(0))
    }, [])


    return (
        <S.Container>
            <S.Header>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={theme.icons.sm} color={theme.colors.backgroundColor} />
                </TouchableOpacity>
                <S.Title>Notificações</S.Title>
            </S.Header>

            <FlatList
                contentContainerStyle={{ padding: '5%' }}
                data={data}
                renderItem={({ item }) => <NotificationItem notification={item} />}
            />
        </S.Container>
    )
}

export default Notification;