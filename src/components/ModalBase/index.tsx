import React from 'react';
import { Modal, ModalProps } from 'react-native';
import * as S from './styles'



type Props = {
    children: React.ReactNode,
    modalProps: ModalProps
}
const ModalBase: React.FC<Props> = ({ children, modalProps }) => {
    return (
        <Modal {...modalProps}>
            <S.Container>
                <S.CloseModal onPress={modalProps.onRequestClose} />
                {children}
            </S.Container>
        </Modal>
    )
}

export default ModalBase;