import React, { useEffect, useState } from 'react';
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
    const user = useSelector((state: RootState) => state.user.user)
    const theme = useTheme()


    const [confirmPassword, setConfirmPassword] = useState('')
    const [value, setValue] = useState('')


    const handleSubmit = () => {
        if (confirmPassword === user?.password && value.length > 0) {
            submit(value)
            setConfirmPassword('')
            setValue('')
            closeModal()
        }
    }

    const handleCloseModal = () => {
        setValue('')
        setConfirmPassword('')
        closeModal()
    }

    return (
        <ModalBase modalProps={{ transparent: true, visible, animationType: 'slide', onRequestClose: handleCloseModal }}>
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
                        placeholder='Digite sua senha atual para confirmar'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}

                    />
                </S.InputArea>

                <S.InputArea>
                    <ComunButton
                        bg={confirmPassword === user?.password ? 'darkContrast' : 'white'}
                        onClick={handleSubmit}
                    >Salvar</ComunButton>
                </S.InputArea>
            </S.Main>
        </ModalBase>
    )
}

export default ModalUpdateUser;