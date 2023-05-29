import React, { useState } from 'react';
import * as S from './styles'
import { FlatList, Modal, ModalProps, Switch, View } from 'react-native'
import { useTheme } from 'styled-components/native';
import SelectBloodType from '../../screens/SelectBloodType';
import SelectBloodTypeItem from '../SelectBloodTypeItem';
import { bloodTypes } from '../../utlis/bloodTypes';
import Input from '../Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAlert } from '../../api/createAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';



type Props = {
    modalProps: ModalProps,
    isAlertOn: boolean,
    bTypesSelecteds: string[] | undefined
}
const ModalCreateAlert: React.FC<Props> = ({ modalProps, isAlertOn = false, bTypesSelecteds }) => {
    const theme = useTheme()
    const [switchEnable, setSwitchEnable] = useState(isAlertOn)
    const [bloodTypesSelecteds, setBloodTypesSelecteds] = useState<string[]>(bTypesSelecteds || [])
    const [message, setMessage] = useState('')
    const user = useSelector((state: RootState) => state.user.user)
    const client = useQueryClient()
    const selectBloogType = (b: string) => {
        if (bloodTypesSelecteds.includes(b)) {
            setBloodTypesSelecteds(old => {
                old.splice(old.indexOf(b), 1)
                console.log("🚀 ~ file: index.tsx:24 ~ selectBloogType ~ old:", old)
                return [...old]
            })
        }

        else setBloodTypesSelecteds(old => [...old, b])
    }
    const { mutate } = useMutation({
        mutationFn: () => createAlert({
            bloodCollectorsID: user?.uid || '',
            bloodTypes: bloodTypesSelecteds,
            description: message,
            status: switchEnable,
            token: user?.token || ''
        }),
        onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data),
        onSuccess: async () => {
            await client.invalidateQueries()
        }
    })

    return (
        <Modal {...modalProps}>
            <S.Container>
                <S.CloseModal onPress={modalProps?.onRequestClose} />

                <S.Main>
                    <S.Title>Alerta</S.Title>

                    <S.Row>
                        <S.SectionTitle>Ativado</S.SectionTitle>
                        <Switch
                            trackColor={{ false: theme.colors.backgroundColorSecond, true: theme.colors.contrast }}
                            thumbColor={'#f4f3f4'}
                            onValueChange={() => setSwitchEnable(old => !old)}
                            value={switchEnable}
                        />
                    </S.Row>

                    <S.SectionTitle>Selecione o(s) tipo(s) sanguíneo</S.SectionTitle>
                    <S.BloodTypesContainer>
                        <FlatList
                            data={bloodTypes}
                            numColumns={4}
                            renderItem={({ item }) =>
                                <SelectBloodTypeItem
                                    fs={theme.fontSize.xsm}
                                    h={theme.vw * 0.15}
                                    w={theme.vw * 0.15}
                                    bloodType={item}
                                    onClick={(b) => selectBloogType(b)}
                                    selected={bloodTypesSelecteds.includes(item)}
                                />
                            }
                        />
                    </S.BloodTypesContainer>

                    <S.SectionTitle>Mensagem personalizada</S.SectionTitle>
                    <S.InputArea>
                        <Input inputProps={{
                            placeholder: 'Mensagem',
                            placeholderTextColor: theme.colors.darkText,
                            value: message,
                            onChangeText: (v) => setMessage(v)
                        }} />
                    </S.InputArea>

                    <S.SubmitButton onPress={() => mutate()}>
                        <S.SubmitLabel>Criar</S.SubmitLabel>
                    </S.SubmitButton>
                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default ModalCreateAlert;