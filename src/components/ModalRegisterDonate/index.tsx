import React from 'react';
import ModalBase from '../ModalBase';
import * as S from './styles'

// import { Container } from './styles';

const ModalRegisterDonate: React.FC = () => {
    return (
        <ModalBase modalProps={{ visible: true, transparent: true, animationType: 'fade' }}>
            <S.Container>
                <S.Title>Cadastrar Doação</S.Title>

                <S.Section>
                    <S.SectionTitle>Local</S.SectionTitle>
                </S.Section>
                <S.Section>
                    <S.SectionTitle>Data</S.SectionTitle>
                </S.Section>
            </S.Container>
        </ModalBase>
    )
}

export default ModalRegisterDonate;