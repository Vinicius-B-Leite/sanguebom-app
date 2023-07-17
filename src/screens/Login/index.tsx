import React, { useState } from 'react';
import * as S from './styles'
import { ActivityIndicator, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { StackRootParamsList } from '../../routes/models';
import Input from '../../components/Input';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/login';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { useDispatch } from 'react-redux';
import { setUser } from '../../feature/user/userSlicer';
import { api } from '../../api';
import { updateStorageUser } from '../../storage/userStorage';
import { UserType } from '../../types/UserType';
import { GenderType } from 'src/types/GenderType';
import { NavigationProp, useNavigation } from '@react-navigation/native';


type Nav = NavigationProp<StackRootParamsList, 'Login'>

const Login: React.FC = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigation = useNavigation<Nav>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const isEnableToSubmit = email.length > 0 && password.length > 7 && email.includes('@')

    const { isLoading, mutate, error } = useMutation(
        () => login({ email, password }),
        {
            onError: (error: AxiosError<ErrorResponse>) => {
                if (error.response && !(['05', '13', '03', '06', '04'].includes(error.response.data.code))) {
                    Alert.alert(
                        'Erro',
                        'Ocorreu um erro inesperado. Volte mais tarde'
                    )
                }
            },
            onSuccess: (data) => {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
                const user: UserType = {
                    bloodType: data.donors?.bloodType || undefined,
                    email: data.email,
                    gender: data.donors?.gender as GenderType || undefined,
                    password: data.password,
                    type: data.type,
                    token: data.token,
                    uid: data.donors?.uid || data.bloodCollectors?.uid || '',
                    username: data.username,
                    adress: data.bloodCollectors?.adress,
                    imageURL: data.bloodCollectors?.imageURL
                }
                dispatch(setUser(user))
                updateStorageUser(user)
            }

        }
    )

    const handleSubmit = () => {
        if (!isEnableToSubmit) return
        mutate()
    }


    return (
        <S.Container>
            <S.GoBack testID='arrowLeft' onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={theme.icons.sm} color={theme.colors.contrast_100} />
            </S.GoBack>

            <S.Title>Fazer Login</S.Title>
            <S.InputArea>
                <Input
                    leftIcon='mail'
                    placeholder='Seu email'
                    placeholderTextColor={theme.colors.text_100}
                    value={email}
                    autoCapitalize='none'
                    onChangeText={setEmail}
                    errorMessage={['05', '04', '13'].includes(error?.response?.data.code || '') ? error?.response?.data.message : ''}
                />
            </S.InputArea>

            <S.InputArea>
                <Input
                    h={theme.vh * 0.07}
                    leftIcon='lock'
                    placeholder='Sua senha'
                    placeholderTextColor={theme.colors.text_100}
                    value={password}
                    onChangeText={setPassword}
                    errorMessage={['03', '04', '06'].includes(error?.response?.data?.code || '') ? error?.response?.data.message : undefined}
                />
            </S.InputArea>

            <S.SubmitButton
                isEnable={isEnableToSubmit}
                onPress={handleSubmit}
            >
                <S.SubmitLabel isEnable={isEnableToSubmit} >{
                    isLoading ?
                        <ActivityIndicator size={theme.icons.sm} color={theme.colors.oppositeContrast} />
                        :
                        'Concluir'}
                </S.SubmitLabel>
            </S.SubmitButton>

        </S.Container>
    )
}

export default Login;