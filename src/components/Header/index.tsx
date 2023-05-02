import React from 'react';
import { View } from 'react-native';
import * as S from './style'
import EvilIcons  from '@expo/vector-icons/EvilIcons';
import { useTheme } from 'styled-components/native';


const Header: React.FC = () => {

    const { colors, icons } = useTheme()

    return (
        <S.Container>
            <S.Logo>Sangue Bom</S.Logo>
            <S.Notifications>
                <EvilIcons name='bell' color={colors.backgroundColor} size={icons.sm} />
            </S.Notifications>
        </S.Container>
    )
}

export default Header;