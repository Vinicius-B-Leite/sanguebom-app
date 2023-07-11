import React from 'react';
import * as S from './style'
import ComunButton from '../../ComunButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDonate } from '../../../api/createDonate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';




type Props = {
    bloodCollectorID: string | undefined,
    date: Date,
    closeModal: () => void
}
const SubmitButton: React.FC<Props> = ({ bloodCollectorID, date, closeModal }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: ({ bcID }: { bcID: string }) => createDonate({
            bloodCollectorID: bcID,
            date,
            userID: user!.uid
        }),
        onSuccess: async () => {
            closeModal()
            await queryClient.invalidateQueries(['donates'])
        }
    })

    const handleSubmit = () => {
        if (!bloodCollectorID ) return

        mutate({ bcID: bloodCollectorID })
    }
    return (
        <S.SubmitArea>
            <ComunButton bg='darkContrast' onClick={handleSubmit}>
                Cadastrar
            </ComunButton>
        </S.SubmitArea>
    )
}

export default SubmitButton;