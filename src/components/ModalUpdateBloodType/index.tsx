import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import ModalBase from '../ModalBase';
import { bloodTypes } from '../../utlis/bloodTypes';
import SelectBloodTypeItem from '../SelectBloodTypeItem';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import ComunButton from '../ComunButton';
import * as S from './styles'
import { updateBloodTypeTag } from '../../onesignal/updateBloodTypeTag';

type Props = {
    visible: boolean,
    onRequestClose: () => void,
    onSubmit: (bloodTypeSelected: string) => void
}
const ModalUpdateBloodType: React.FC<Props> = ({ onRequestClose, visible, onSubmit }) => {
    const theme = useTheme()
    const user = useSelector((state: RootState) => state.user.user)
    const [bloodTypeSelected, setBloodTypeSelected] = useState(user?.bloodType)


    const handleSubmit = () => {
        if (bloodTypeSelected && user?.bloodType !== bloodTypeSelected) {
            onSubmit(bloodTypeSelected)
            onRequestClose()
            updateBloodTypeTag(bloodTypeSelected)
        }
    }

    if (user?.type == 'bloodCollectors') return null

    return (
        <ModalBase modalProps={{ animationType: 'fade', visible, onRequestClose, transparent: true }}>
            <S.Container>
                <S.Title>Selecione seu tipo sanguíeno</S.Title>
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
                                onClick={setBloodTypeSelected}
                                selected={bloodTypeSelected === item}
                            />
                        }
                    />
                </S.BloodTypesContainer>
                <S.BtnArea>
                    <ComunButton bg='darkContrast' onClick={handleSubmit}>Salvar</ComunButton>
                </S.BtnArea>
            </S.Container>
        </ModalBase>
    )
}

export default ModalUpdateBloodType;