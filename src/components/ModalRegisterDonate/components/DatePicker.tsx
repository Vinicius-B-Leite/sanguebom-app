import React from 'react';
import * as S from './style'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';



type Props = {
    dateSelected: Date,
    selectDate: (date: Date) => void
}
const DatePicker: React.FC<Props> = ({ dateSelected, selectDate }) => {

    const { icons, colors } = useTheme()
    const handleOpenCalendar = () => {
        DateTimePickerAndroid.open({
            value: dateSelected,
            maximumDate: new Date(),
            onChange: (_, date) => date && selectDate(date)
        })
    }


    return (
        <S.DatePickerArea onPress={handleOpenCalendar}>
            <AntDesign name="calendar" size={icons.sm} color={colors.text} />
            <S.Date>{dateSelected.toLocaleDateString()}</S.Date>
        </S.DatePickerArea>
    )
}

export default DatePicker;