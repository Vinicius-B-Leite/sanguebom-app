import React from 'react';
import * as S from '../styles'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useTheme } from 'styled-components/native';



type Props = {
    iconName: 'user' | 'lock' | 'tint' | 'sun-o' | 'moon-o' | 'home' | 'phone' | 'sign-out',
    onPress: () => void,
    title: string
}
const Options: React.FC<Props> = ({ iconName, onPress, title }) => {
    const { icons, colors } = useTheme()

    return (
        <S.ItemContainer onPress={onPress}>
            <S.ItemBackgroundIcon>
                <FontAwesome name={iconName} size={icons.vsm} color={colors.contrast_100} />
            </S.ItemBackgroundIcon>

            <S.ItemLabel>{title}</S.ItemLabel>
        </S.ItemContainer>
    )
}

export default Options;