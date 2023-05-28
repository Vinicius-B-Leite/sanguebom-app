import React from 'react';
import { View } from 'react-native';
import * as S from './style'
import Logo from '../../../assets/splash.png'


const Loading: React.FC = () => {
    return (
        <S.Container>

            <S.SplashImage source={Logo} />

        </S.Container>
    )
}

export default Loading;