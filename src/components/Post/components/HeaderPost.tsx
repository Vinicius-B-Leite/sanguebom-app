import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import * as S from './styles'
import { baseURL } from '../../../api';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../../api/deletePost';
import Toast, { ToastRef } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';


type Props = {
    avatarUrl: string,
    username: string,
    postId: string,
    postOwnerId: string
}
const HeaderPost: React.FC<Props> = ({ avatarUrl, username, postId, postOwnerId }) => {
    const theme = useTheme()

    const userId = useSelector((state: RootState) => state.user.user?.uid)

    const [showOptions, setShowOptions] = useState(false)
    const client = useQueryClient()
    const toastRef = useRef<ToastRef>(null)

    const { mutate, isLoading } = useMutation({
        mutationFn: (id: string) => deletePost(id),
        onSuccess: async () => {
            toastRef.current?.startAnimation({
                text: 'Campanha deletada',
                type: 'sucess',
            })
            await client.invalidateQueries(['posts'])
        },
        onError: () => {
            toastRef.current?.startAnimation({
                text: 'Erro ao deletar campanha',
                type: 'error',
            })
        }
    })

    const handleDelete = async () => {
        mutate(postId)
    }

    const isOwner = userId === postOwnerId

    return (
        <>
            <S.Header>
                <Toast ref={toastRef} />
                <S.Avatar source={{ uri: baseURL + avatarUrl }} />
                <S.Username numberOfLines={1}>{username}</S.Username>

                {
                    showOptions && isOwner &&
                    <S.OptionsWrapper>
                        <TouchableOpacity onPress={() => handleDelete()}>
                            {
                                isLoading ?
                                    <ActivityIndicator size={theme.icons.vvsm} color={theme.colors.contrast_100} />
                                    :
                                    <S.Option variant='delete'>Deletar</S.Option>
                            }
                        </TouchableOpacity>
                    </S.OptionsWrapper>
                }
                <S.OptionButton onPress={() => setShowOptions(old => !old)}>
                    <SimpleLineIcons
                        name="options-vertical"
                        size={theme.icons.vvsm}
                        color={theme.colors.text_200}
                    />


                </S.OptionButton>



            </S.Header>
        </>
    )
}

export default HeaderPost;