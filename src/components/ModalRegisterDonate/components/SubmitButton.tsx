import React, { useRef } from 'react';
import * as S from './style'
import ComunButton from '../../ComunButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDonate } from '../../../api/createDonate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';
import Toast, { ToastRef } from '../../../components/Toast';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';




type Props = {
    bloodCollectorID: string | undefined,
    date: Date,
    closeModal: () => void
}
const SubmitButton: React.FC<Props> = ({ bloodCollectorID, date, closeModal }) => {
    const theme = useTheme()

    const user = useSelector((state: RootState) => state.user.user)
    const queryClient = useQueryClient()

    const toastRef = useRef<ToastRef>(null)

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ bcID }: { bcID: string }) => createDonate({
            bloodCollectorID: bcID,
            date,
            userID: user!.uid
        }),
        onSuccess: async () => {
            closeModal()
            toastRef.current?.startAnimation({
                type: 'sucess',
                text: 'Doação realizada!'
            })
            await queryClient.invalidateQueries(['donates'])
        },
        onError: (error) => {
            toastRef.current?.startAnimation({
                type: 'error',
                text: 'Erro ao cadastrar doação!'
            })
        }
    })

    const handleSubmit = () => {
        if (!bloodCollectorID) return

        mutate({ bcID: bloodCollectorID })
    }
    return (
        <>
            <Toast ref={toastRef} />
            <S.SubmitArea>
                <ComunButton bg='darkContrast' onClick={handleSubmit}>
                    {
                        isLoading ?
                            <ActivityIndicator
                                size={theme.icons.vvsm}
                                color='#fff' />
                            :
                            'Cadastrar'
                    }

                </ComunButton>
            </S.SubmitArea>
        </>
    )
}

export default SubmitButton;