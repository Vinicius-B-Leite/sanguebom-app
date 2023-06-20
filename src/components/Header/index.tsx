import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './style'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import BloodDonateIcon from '../../assets/blood-donation.svg'
import { useQuery } from '@tanstack/react-query';
import { getNotificationLength } from '../../api/getNotificationLength';
import { setNotificationLength } from '../../feature/notification/notificationSlice';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';


type Props = {
    onClickBell: () => void,
    onClickBloodDonate: () => void
}
const Header: React.FC<Props> = ({ onClickBell, onClickBloodDonate }) => {

    const { colors, icons, type } = useTheme()
    const notificationsLength = useSelector((state: RootState) => state.notification.length)
    const user = useSelector((rootState: RootState) => rootState.user.user)
    const dispatch = useDispatch()

    const { data, refetch } = useQuery({
        queryKey: ['notificationLength'],
        enabled: false,
        queryFn: () => getNotificationLength({ uid: user?.uid ?? '' }),
        onSuccess: (res) => {
            dispatch(setNotificationLength(res))
        },
        onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data.message)
    })

    useEffect(() => {
        if (!notificationsLength) {
            refetch()
        }
    }, [])

    return (
        <S.Container>
            <S.Logo>Sangue Bom</S.Logo>
            <S.Right>
                <S.Notifications onPress={onClickBell}>
                    {
                        (data && data > 0) ?
                            <S.NotificationNumberArea>
                                <S.NotificationLabel>{Number(data) < 99 ? Number(data) : '99+'}</S.NotificationLabel>
                            </S.NotificationNumberArea>
                            :
                            <></>
                    }
                    <EvilIcons
                        name='bell'
                        color={type === 'dark' ? colors.text_200 : colors.background_100}
                        size={icons.sm}
                    />
                </S.Notifications>

                <TouchableOpacity onPress={onClickBloodDonate}>
                    <BloodDonateIcon width={icons.sm} height={icons.sm} />
                </TouchableOpacity>
            </S.Right>
        </S.Container>
    )
}

export default Header;