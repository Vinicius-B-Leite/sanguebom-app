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
import ModalBase from '../ModalBase';



type Props = {
    isAlertOn: boolean,
    bTypesSelecteds: string[] | undefined,
    visible: boolean,
    onRequestClose: () => void
}
const ModalCreateAlert: React.FC<Props> = ({ isAlertOn = false, bTypesSelecteds, visible, onRequestClose }) => {
    
    const theme = useTheme()
    const user = useSelector((state: RootState) => state.user.user)
    const client = useQueryClient()

    const [switchEnable, setSwitchEnable] = useState(isAlertOn)
    const [bloodTypesSelecteds, setBloodTypesSelecteds] = useState<string[]>(bTypesSelecteds || [])
    const [message, setMessage] = useState('')
    
    const selectBloogType = (b: string) => {
        if (bloodTypesSelecteds.includes(b)) {
            setBloodTypesSelecteds(old => {
                old.splice(old.indexOf(b), 1)
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
        }),
        onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data),
        onSuccess: async () => {
            await client.invalidateQueries(['bloodCollectors'])
            onRequestClose()
        }
    })

    return (
        <ModalBase modalProps={{
            visible,
            onRequestClose,
            animationType: 'fade',
            transparent: true
        }}>
            <S.Main>
                <S.Title>Alerta</S.Title>

                <S.Row>
                    <S.SectionTitle>Ativado</S.SectionTitle>
                    <Switch
                        trackColor={{ false: theme.colors.background_100, true: theme.colors.contrast_100 }}
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
                    <Input
                        placeholder={'Mensagem'}
                        placeholderTextColor={theme.colors.text_100}
                        value={message}
                        onChangeText={(v) => setMessage(v)}
                    />
                </S.InputArea>

                <S.SubmitButton onPress={() => mutate()}>
                    <S.SubmitLabel>Criar</S.SubmitLabel>
                </S.SubmitButton>
            </S.Main>
        </ModalBase>
    )
}

export default ModalCreateAlert;