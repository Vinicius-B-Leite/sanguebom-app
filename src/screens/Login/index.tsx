import React, { useState } from 'react';
import * as S from './styles'
import { ActivityIndicator, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackRootParamsList } from '../../routes/models';
import Input from '../../components/Input';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/login';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { useDispatch } from 'react-redux';
import { setUser } from '../../feature/user/userSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api';
import { updateStorageUser } from '../../storage/userStorage';


type Nav = StackScreenProps<StackRootParamsList, 'Login'>
const Login: React.FC<Nav> = ({ navigation, route }) => {
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { isLoading, mutate, error } = useMutation(
        () => login({ email, password }),
        {
            onError: (error: AxiosError<ErrorResponse>) => {
                if (error.response && !(['05', '13', '03', '06'].includes(error.response.data.code))) {
                    Alert.alert(
                        'Erro',
                        'Ocorreu um erro inesperado. Volte mais tarde'
                    )
                }
            },
            onSuccess: async ({ data }) => {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
                dispatch(setUser(data))
                await updateStorageUser(data)
            }

        }
    )

    const handleSubmit = () => {
        mutate()
    }


    return (
        <S.Container>
            <S.GoBack onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={theme.icons.sm} color={theme.colors.contrast} />
            </S.GoBack>

            <S.Title>Fazer Login</S.Title>
            <S.InputArea>
                <Input
                    leftIcon='mail'
                    placeholder='Seu email'
                    placeholderTextColor={theme.colors.darkText}
                    value={email}
                    onChangeText={setEmail}
                    errorMessage={['05', '13'].includes(error?.response?.data.code || '') ? error?.response?.data.message : ''}
                />
            </S.InputArea>

            <S.InputArea>
                <Input
                    h={theme.vh * 0.07}
                    leftIcon='lock'
                    placeholder='Sua senha'
                    placeholderTextColor={theme.colors.darkText}
                    value={password}
                    onChangeText={setPassword}
                    errorMessage={['03', '06'].includes(error?.response?.data?.code || '') ? error?.response?.data.message : undefined}
                />
            </S.InputArea>

            <S.SubmitButton
                isEnable={email.length > 0 && password.length > 7 && email.includes('@')}
                onPress={handleSubmit}
            >
                <S.SubmitLabel>{isLoading ? <ActivityIndicator size={theme.icons.sm} color={theme.colors.backgroundColor} /> : 'Concluir'}</S.SubmitLabel>
            </S.SubmitButton>

        </S.Container>
    )
}

export default Login;