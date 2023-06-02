import React, { useState } from 'react';
import ModalBase from '../ModalBase';
import * as S from './styles'
import DropDown from '../DropDown';
import BloodCollectorItem from './components/BloodCollectorItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBloodCollectors } from '../../api/getBloodCollectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { HospitalType } from '../../types/HospitalType';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from './components/DatePicker';
import ComunButton from '../ComunButton';
import { createDonate } from '../../api/createDonate';
import SubmitButton from './components/SubmitButton';




type Props = {
    visible: boolean,
    closeModal: () => void
}
const ModalRegisterDonate: React.FC<Props> = ({ closeModal, visible }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const [bloodCollectorSelected, setBloodCollectorSelected] = useState<HospitalType | undefined>(undefined)
    const [dateSelected, setDateSelected] = useState(new Date())

    const { data } = useQuery(
        ['bloodCollectors'],
        () => getBloodCollectors({ token: user?.token ?? '' })
    )

    


    return (
        <ModalBase modalProps={{ visible, transparent: true, animationType: 'fade', onRequestClose: closeModal }}>
            <S.Container>
                <S.Title>Cadastrar Doação</S.Title>

                <S.Section>
                    <S.SectionTitle>Local</S.SectionTitle>
                    <S.DropDownArea>
                        <DropDown
                            placeholder={'Selecione um ponto'}
                            value={bloodCollectorSelected?.username}
                            data={data}
                            onSelect={(item) => setBloodCollectorSelected(item)}
                            renderItem={({ item }) => <BloodCollectorItem bloodCollector={item} />}
                        />
                    </S.DropDownArea>
                </S.Section>
                <S.Section>
                    <S.SectionTitle>Data</S.SectionTitle>
                    <DatePicker dateSelected={dateSelected} selectDate={(date) => setDateSelected(date)} />
                </S.Section>

                <SubmitButton bloodCollectorID={bloodCollectorSelected?.uid} date={dateSelected} />
            </S.Container>
        </ModalBase>
    )
}

export default ModalRegisterDonate;