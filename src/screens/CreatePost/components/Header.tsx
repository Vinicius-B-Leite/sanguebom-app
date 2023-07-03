import React from 'react';
import { TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import * as S from './styles'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../../api/createPost';
import { useSelector } from 'react-redux';
import { RootState } from 'src/feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../../types/ErrorResponse';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


type Props = {
    adress: string,
    hours: string,
    banner: { uri: string, name: string, type: string },
    description: string,
    linkRedirect: string,

    onSucessed: () => void
}
const Header: React.FC<Props> = ({ adress, banner, description, linkRedirect, hours, onSucessed }) => {
    const user = useSelector((state: RootState) => state.user.user)
    const client = useQueryClient()
    const theme = useTheme()
    const navigate = useNavigation()

    const { mutate, isLoading } = useMutation(() => createPost(
        {
            adress,
            banner,
            description,
            linkRedirect,
            bloodCollectorsID: user?.uid || '',
        }),
        {
            onError: (err: AxiosError<ErrorResponse>) => {
                if (err.response && err.response.data.code !== '08') {
                    ToastAndroid.show('Ops! Ocorreu um erro', ToastAndroid.LONG)
                } else {
                    console.log(err.response?.data.message)
                }
            },
            onSuccess: () => {
                client.invalidateQueries(['posts'])
                onSucessed()
            }
        }
    )

    const handleSubmit = () => {
        if (banner.uri.length === 0 || adress.length === 0 || hours.length === 0 || description.length === 0) return

        mutate()
    }
    return (
        <S.Header>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <S.Title>{'<   '} Criar post</S.Title>
            </TouchableOpacity>
            <S.DoneBtn onPress={handleSubmit}>
                <S.DoneTxt>{isLoading ?
                    <ActivityIndicator
                        size={theme.icons.vvsm}
                        color={theme.type === 'dark' ? theme.colors.oppositeContrast : theme.colors.contrast_100} /> :
                    'concluir'}
                </S.DoneTxt>
            </S.DoneBtn>
        </S.Header>
    )
}

export default Header;