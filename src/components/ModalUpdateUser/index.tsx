import React, { useState } from 'react';
import { Modal } from 'react-native';
import * as S from './styles'
import Input from '../Input';
import ComunButton from '../ComunButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import ModalBase from '../ModalBase';
import { useTheme } from 'styled-components/native';


type Props = {
    closeModal: () => void,
    visible: boolean,
    submit: (value: string) => void,
    title: string
}
const ModalUpdateUser: React.FC<Props> = ({ closeModal, visible, submit, title }) => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const user = useSelector((state: RootState) => state.user.user)
    const [value, setValue] = useState('')
    const theme = useTheme()

    return (
        <ModalBase modalProps={{ transparent: true, visible, animationType: 'slide', onRequestClose: closeModal }}>
            <S.Main>
                <S.Title>Atualizar {title}</S.Title>

                <S.InputArea>
                    <Input
                        placeholderTextColor={theme.colors.text_100}
                        placeholder={'Novo ' + title}
                        value={value}
                        onChangeText={txt => setValue(txt)}

                    />
                </S.InputArea>

                <S.InputArea>
                    <Input
                        placeholderTextColor={theme.colors.text_100}
                        placeholder={'Digite sua senha atual para confirmar'}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}

                    />
                </S.InputArea>

                <S.InputArea>
                    <ComunButton
                        bg={confirmPassword === user?.password ? 'darkContrast' : 'white'}
                        onClick={() => confirmPassword === user?.password && submit(value)}
                    >Salvar</ComunButton>
                </S.InputArea>
            </S.Main>
        </ModalBase>
    )
}

export default ModalUpdateUser;