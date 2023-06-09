import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './style'
import { NotificationType } from '../../types/NotificationType';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { useNavigation } from '@react-navigation/native';




type Props = {
    notification: NotificationType
}


type NavType = StackNavigationProp<StackHomeParamsList, 'Notification'>

const NotificationItem: React.FC<Props> = ({ notification }) => {

    const theme = useTheme()
    const navigation = useNavigation<NavType>()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        if (notification.type === 'alert' && notification.description.length > 0 ) {
            setOpen(old => !old)
            return
        }

        navigation.navigate('Post', { postID: notification.postID as string })
    }

    return (
        <S.Container testID='notificationContainer' onPress={handleClick}>
            <S.Circle>
                {
                    notification.type === 'alert' ?
                        <Ionicons name="ios-water-outline" size={theme.icons.sm} color={theme.colors.background_100} /> :
                        <Feather name="smartphone" size={theme.icons.sm} color={theme.colors.background_100} />

                }
            </S.Circle>
            <S.Right>
                <S.Title>{notification.title}</S.Title>
                {
                    open &&
                    <S.Description>{notification.description}</S.Description>
                }
            </S.Right>
        </S.Container>
    )
}

export default NotificationItem;