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
                    console.log(error.response.data)
                }
            },
            onSuccess: async ({ data }) => {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
                dispatch(setUser(data))
                await AsyncStorage.setItem('@user', JSON.stringify(data))
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
                    inputProps={{
                        placeholder: 'Seu email',
                        placeholderTextColor: theme.colors.darkText,
                        value: email,
                        onChangeText: setEmail
                    }}
                />
            </S.InputArea>
            {
                error?.response && ['05', '13'].includes(error.response.data.code) && (
                    <S.ErrorMessage>{error.response.data.message}</S.ErrorMessage>
                )
            }
            <S.InputArea>
                <Input
                    leftIcon='lock'
                    inputProps={{
                        placeholder: 'Sua senha',
                        placeholderTextColor: theme.colors.darkText,
                        value: password,
                        onChangeText: setPassword
                    }}
                />
            </S.InputArea>
            {
                error?.response && ['03', '06'].includes(error.response.data.code) && (
                    <S.ErrorMessage>{error.response.data.message}</S.ErrorMessage>
                )
            }

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