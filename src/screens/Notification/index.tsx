import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import * as S from './styles'
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { useQuery } from '@tanstack/react-query';
import { getNotification } from '../../api/getNotification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import NotificationItem from '../../components/NotificationItem';
import { setNotificationLength } from '../../feature/notification/notificationSlice';
import HeaderGoBack from '../../components/HeaderGoBack';
import { getNotificationsStorage, setLastNotificationRead, setNotificationsStorage } from '../../storage/notificationStorage';
import { NotificationType } from '../../types/NotificationType';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';



const Notification: React.FC = () => {


    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const theme = useTheme()

    const [offlineNotifications, setOfflineNotifications] = useState<NotificationType[]>([])

    const { data, isLoading } = useQuery(
        ['notification'],
        () => getNotification({ uid: user!.uid }),
        {
            onError: (err: AxiosError) => {
                if (err.message === 'Network Error') {
                    const storageNotifications = getNotificationsStorage()
                    storageNotifications && setOfflineNotifications(storageNotifications)
                }
            },
            onSuccess: (res) => {
                if (res.length > 0){
                    setLastNotificationRead(res[0].id)
                    setNotificationsStorage(res)
                    dispatch(setNotificationLength(0))
                }
            }
        }
    )



    return (
        <S.Container>

            <HeaderGoBack goBack={() => navigation.goBack()} theme='contrast' title='Notificações' />

            {
                isLoading ?
                    <ActivityIndicator style={{ marginTop: '5%' }} color={theme.colors.contrast_100} size={theme.icons.sm} />
                    :
                    <FlatList
                        contentContainerStyle={{ padding: '5%' }}
                        data={data || offlineNotifications}
                        renderItem={({ item }) => <NotificationItem notification={item} />}
                        ListEmptyComponent={<S.ListEmptyText>Não há nenhuma notificação por enquanto</S.ListEmptyText>}
                    />
            }
        </S.Container>
    )
}

export default Notification;