import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Text } from 'react-native';
import * as S from './styles'
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
import HeaderGoBack from '../../components/HeaderGoBack';
import { getNotificationsStorage, setLastNotificationRead, setNotificationsStorage } from '../../storage/notificationStorage';
import { NotificationType } from '../../types/NotificationType';



type Nav = StackScreenProps<StackHomeParamsList, 'Notification'>

const Notification: React.FC<Nav> = ({ navigation }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const [offlineNotifications, setOfflineNotifications] = useState<NotificationType[]>([])

    const { data } = useQuery(
        ['notification'],
        () => getNotification({ uid: user?.uid ?? '' }),
        {
            onError: (err: AxiosError) => {
                if (err.message === 'Network Error') {
                    const storageNotifications = getNotificationsStorage()
                    setOfflineNotifications(storageNotifications || [])
                }
            },
            onSuccess: (res) => {
                setLastNotificationRead(res[0].id)
                setNotificationsStorage(res)
            }
        }
    )

    useEffect(() => {
        dispatch(setNotificationLength(0))
    }, [])


    return (
        <S.Container>

            <HeaderGoBack goBack={() => navigation.goBack()} theme='contrast' title='Notificações' />


            <FlatList
                contentContainerStyle={{ padding: '5%' }}
                data={data || offlineNotifications}
                renderItem={({ item }) => <NotificationItem notification={item} />}
            />
        </S.Container>
    )
}

export default Notification;