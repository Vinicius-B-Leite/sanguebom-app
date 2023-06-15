import React from 'react';
import { View } from 'react-native';
import * as S from './styles'
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';


type Props = {
    onClick: () => void
}

const AlertButton: React.FC<Props> = ({ onClick }) => {

    const theme = useTheme()

    return (
        <S.Container onPress={onClick}>
            <Feather name="alert-triangle" size={theme.icons.vmd} color={theme.type === 'dark' ? theme.colors.text : theme.colors.background_100} />
        </S.Container>
    )
}

export default AlertButton;