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


type Props = {
    onClickBell: () => void,
    onClickBloodDonate: () => void
}
const Header: React.FC<Props> = ({ onClickBell, onClickBloodDonate }) => {

    const { colors, icons, type } = useTheme()
    const dispatch = useDispatch()

    const notificationsLength = useSelector((state: RootState) => state.notification.length)
    const user = useSelector((rootState: RootState) => rootState.user.user)


    const { data } = useQuery({
        queryKey: ['notificationLength'],
        enabled: notificationsLength >= 0,
        queryFn: () => getNotificationLength({ uid: user!.uid }),
        onSuccess: (res: number) => {
            dispatch(setNotificationLength(res))
        }
    })

    useEffect(() => {
        dispatch(setNotificationLength(0))
    }, [])


    return (
        <S.Container>
            <S.Logo>Sangue Bom</S.Logo>
            {
                user?.type !== 'bloodCollectors' &&
                <S.Right>
                    <S.Notifications onPress={onClickBell} >
                        {
                            (data && data > 0) ?
                                (<S.NotificationNumberArea testID='notificationLenght'>
                                    <S.NotificationLabel>{Number(data) < 99 ? Number(data) : '99+'}</S.NotificationLabel>
                                </S.NotificationNumberArea>)
                                :
                                <></>
                        }
                        <EvilIcons
                            testID='bellIcon'
                            name='bell'
                            color={type === 'dark' ? colors.text_200 : colors.background_100}
                            size={icons.sm}
                        />
                    </S.Notifications>

                    <TouchableOpacity onPress={onClickBloodDonate}>
                        <BloodDonateIcon testID='bloodDonateIcon' width={icons.sm} height={icons.sm} />
                    </TouchableOpacity>
                </S.Right>
            }
        </S.Container>
    )
}

export default Header;