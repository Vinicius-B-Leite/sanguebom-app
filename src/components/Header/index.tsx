import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as S from './style'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';



type Props = {
    onClickBell: () => void,
}
const Header: React.FC<Props> = ({ onClickBell }) => {

    const { colors, icons, type } = useTheme()
    const notificationsLength = useSelector((state: RootState) => state.notification.length)


    return (
        <S.Container>
            <S.Logo>Sangue Bom</S.Logo>
            <S.Notifications onPress={onClickBell}>
                {
                    notificationsLength > 0 &&
                    <S.NotificationNumberArea>
                        <S.NotificationLabel>{notificationsLength < 99 ? notificationsLength : '99+'}</S.NotificationLabel>
                    </S.NotificationNumberArea>
                }
                <EvilIcons name='bell' color={type === 'dark' ? colors.text : colors.backgroundColor} size={icons.sm} />
            </S.Notifications>
        </S.Container>
    )
}

export default Header;