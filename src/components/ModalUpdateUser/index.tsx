import React, { useState } from 'react';
import { Modal } from 'react-native';
import * as S from './styles'
import Input from '../Input';
import ComunButton from '../ComunButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';


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


    return (
        <Modal transparent visible={visible} animationType='slide'>
            <S.Container onPress={closeModal}>
                <S.Main>
                    <S.Title>Atualizar {title}</S.Title>

                    <S.InputArea>
                        <Input
                            inputProps={{
                                placeholder: 'Novo ' + title,
                                value,
                                onChangeText: txt => setValue(txt)
                            }}
                        />
                    </S.InputArea>

                    <S.InputArea>
                        <Input
                            inputProps={{
                                placeholder: 'Confirmar senha',
                                value: confirmPassword,
                                onChangeText: setConfirmPassword
                            }}
                        />
                    </S.InputArea>

                    <S.InputArea>
                        <ComunButton bg={confirmPassword === user?.password ? 'darkContrast' : 'white'} onClick={() => confirmPassword === user?.password && submit(value)} >Salvar</ComunButton>
                    </S.InputArea>
                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default ModalUpdateUser;