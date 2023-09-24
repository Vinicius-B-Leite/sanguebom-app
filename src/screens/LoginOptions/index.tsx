import React from 'react';
import { useWindowDimensions } from 'react-native';
import * as S from './styles'
import Logo from '../../assets/logo.svg'
import ComunButton from '../../components/ComunButton';
import type { StackScreenProps } from '@react-navigation/stack'
import { StackRootParamsList } from '../../routes/models';

type NavProps = StackScreenProps<StackRootParamsList, 'LoginOptions'>

const LoginOptions: React.FC<NavProps> = ({ navigation }) => {
    const { width } = useWindowDimensions()

    return (
        <S.Container>
            <S.ImageCircle>
                <Logo width={width * 0.5} height={width * 0.5} />
            </S.ImageCircle>

            <S.ButtonContainer>
                <ComunButton onClick={() => navigation.navigate('SelectBloodType')} bg='white'>Criar uma conta</ComunButton>
            </S.ButtonContainer>
            <S.ButtonContainer>
                <ComunButton onClick={() => navigation.navigate('Login')} bg='darkContrast'>Fazer Login</ComunButton>
            </S.ButtonContainer>
        </S.Container>
    )
}

export default LoginOptions;