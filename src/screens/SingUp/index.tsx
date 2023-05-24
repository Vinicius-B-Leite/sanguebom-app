import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { StackRootParamsList } from '../../routes/models';
import * as S from './style'
import { useTheme } from 'styled-components/native';
import Input from '../../components/Input';
import { useMutation } from '@tanstack/react-query';
import { createAccount } from '../../api/createAcount'
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../feature/user/userSlicer';
import { UserType } from '../../types/UserType';
import { ErrorResponse } from '../../types/ErrorResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderGoBack from '../../components/HeaderGoBack';


type Nav = StackScreenProps<StackRootParamsList, 'SingUp'>

const SingUp: React.FC<Nav> = ({ navigation, route }) => {
    const theme = useTheme()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()

    const onSuccess = async (res: AxiosResponse<UserType, any>) => {
        const data = { ...res.data, type: 'normal user' }
        await AsyncStorage.setItem('@user', JSON.stringify(data))
        dispatch(setUser(data as UserType))
    }

    const onError = async (error: AxiosError<ErrorResponse>) => {
        if (error.response && !(['02', '03', '13'].includes(error.response?.data.code))) {
            Alert.alert(
                'Ops',
                'Ocorreu um erro. Volte mais tarde'
            )
        }
    }

    const { isLoading, mutate, error } = useMutation({
        mutationFn: () => createAccount({
            bloodType: route.params.bloodtype,
            email,
            password,
            username
        }),
        onSuccess,
        onError
    })


    return (
        <S.Container>
            <HeaderGoBack goBack={() => navigation.goBack()} theme='transparent' />

            <S.Title>Criar conta</S.Title>

            <S.Form>
                <S.InputArea>
                    <Input
                        leftIcon='user'
                        inputProps={{
                            value: username,
                            onChangeText: setUsername,
                            placeholder: 'Nome de usuário',
                            placeholderTextColor: theme.colors.darkText
                        }} />
                </S.InputArea>

                <S.InputArea>
                    <Input
                        leftIcon='mail'
                        inputProps={{
                            value: email,
                            onChangeText: setEmail,
                            placeholder: 'Email',
                            placeholderTextColor: theme.colors.darkText
                        }} />
                </S.InputArea>
                {
                    error?.response
                    && ['02', '13'].includes(error.response?.data.code)
                    && <S.ErrorMessage>{error?.response?.data.message}</S.ErrorMessage>
                }

                <S.InputArea>
                    <Input
                        leftIcon='lock'
                        inputProps={{
                            value: password,
                            onChangeText: setPassword,
                            placeholder: 'Senha',
                            placeholderTextColor: theme.colors.darkText
                        }} />
                </S.InputArea>
                {
                    error?.response
                    && ['03'].includes(error.response?.data.code)
                    && <S.ErrorMessage>{error?.response?.data.message}</S.ErrorMessage>
                }

                <S.InputArea>
                    <Input
                        leftIcon='lock'
                        inputProps={{
                            value: confirmPassword,
                            onChangeText: setConfirmPassword,
                            placeholder: 'Confirme a senha',
                            placeholderTextColor: theme.colors.darkText
                        }} />
                </S.InputArea>

                <S.SubmitButton
                    isEnable={
                        username.length > 0 &&
                        email.length > 0 &&
                        password.length > 0 &&
                        confirmPassword.length > 0 &&
                        confirmPassword == password}
                    onPress={() => mutate()}
                >
                    <S.SubmitLabel>{isLoading ? <ActivityIndicator size={theme.icons.sm} color={theme.colors.backgroundColor} /> : 'Concluir'}</S.SubmitLabel>
                </S.SubmitButton>
            </S.Form>


        </S.Container>
    )
}

export default SingUp;