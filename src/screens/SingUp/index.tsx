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
import HeaderGoBack from '../../components/HeaderGoBack';
import { api } from '../../api';
import { updateStorageUser } from '../../storage/userStorage';
import DropDown from '../../components/DropDown';


type Nav = StackScreenProps<StackRootParamsList, 'SingUp'>

const SingUp: React.FC<Nav> = ({ navigation, route }) => {
    const theme = useTheme()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const dispatch = useDispatch()

    const onSuccess = async (res: AxiosResponse<UserType, any>) => {
        await updateStorageUser(res.data)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
        dispatch(setUser(res.data as UserType))
    }

    const onError = async (error: AxiosError<ErrorResponse>) => {
        if (error.response && !(['02', '03', '13', '20'].includes(error.response?.data.code))) {
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
            username,
            gender
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

                        value={username}
                        onChangeText={setUsername}
                        placeholder={'Nome de usuário'}
                        placeholderTextColor={theme.colors.darkText}
                    />
                </S.InputArea>

                <S.InputArea>
                    <Input
                        leftIcon='mail'

                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Email'}
                        placeholderTextColor={theme.colors.darkText}
                        errorMessage={['02', '13'].includes(error?.response?.data.code || '') ? error?.response?.data.message : undefined}
                    />
                </S.InputArea>


                <S.InputArea>
                    <Input
                        leftIcon='lock'

                        value={password}
                        onChangeText={setPassword}
                        placeholder={'Senha'}
                        placeholderTextColor={theme.colors.darkText}
                        errorMessage={['03'].includes(error?.response?.data.code || '') ? error?.response?.data.message : undefined}
                    />
                </S.InputArea>

                <S.InputArea>
                    <Input
                        leftIcon='lock'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={'Confirme a senha'}
                        placeholderTextColor={theme.colors.darkText}
                    />
                </S.InputArea>

                <DropDown
                    data={['female', 'male']}
                    renderItem={({ item }) => <S.DropdownItem>{item === 'female' ? 'Feminino' : 'Masculino'}</S.DropdownItem>}
                    placeholder='Selecione seu sexo biológico'
                    value={gender === 'female' ? 'Feminino' : 'Masculino'}
                    onSelect={(item) => setGender(item)}
                />

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


        </S.Container >
    )
}

export default SingUp;