import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './style'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import BloodDonateIcon from '../../assets/blood-donation.svg'


type Props = {
    onClickBell: () => void,
    onClickBloodDonate: () => void
}
const Header: React.FC<Props> = ({ onClickBell, onClickBloodDonate }) => {

    const { colors, icons, type } = useTheme()
    const notificationsLength = useSelector((state: RootState) => state.notification.length)


    return (
        <S.Container>
            <S.Logo>Sangue Bom</S.Logo>
            <S.Right>
                <S.Notifications onPress={onClickBell}>
                    {
                        notificationsLength > 0 &&
                        <S.NotificationNumberArea>
                            <S.NotificationLabel>{notificationsLength < 99 ? notificationsLength : '99+'}</S.NotificationLabel>
                        </S.NotificationNumberArea>
                    }
                    <EvilIcons name='bell' color={type === 'dark' ? colors.text : colors.backgroundColor} size={icons.sm} />
                </S.Notifications>

                <TouchableOpacity onPress={onClickBloodDonate}>
                    <BloodDonateIcon width={icons.sm} height={icons.sm} />
                </TouchableOpacity>
            </S.Right>
        </S.Container>
    )
}

export default Header;