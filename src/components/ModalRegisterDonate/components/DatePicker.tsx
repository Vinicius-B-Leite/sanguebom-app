import React, { useState } from 'react';
import * as S from './style'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import DateTimePicker from '@react-native-community/datetimepicker';


type Props = {
    dateSelected: Date,
    selectDate: (date: Date) => void
}
const DatePicker: React.FC<Props> = ({ dateSelected, selectDate }) => {

    const { icons, colors } = useTheme()
    const [isDateVisible, setIsDateVisible] = useState(false)

    const handleOnChange = (date: Date | undefined) => {
        if (date) {
            selectDate(date)
            setIsDateVisible(false)
        }
    }
    return (
        <S.DatePickerArea testID='openCalendarButton' onPress={() => setIsDateVisible(true)}>
            <AntDesign name="calendar" size={icons.sm} color={colors.text_200} />
            <S.Date>{`${dateSelected.getDate()}/${dateSelected.getMonth() + 1}/${dateSelected.getFullYear()}`}</S.Date>

            {
                isDateVisible &&

                <DateTimePicker
                    testID='calendarPicker'
                    value={dateSelected}
                    mode='date'
                    onChange={(ev, date) => handleOnChange(date) }
                    maximumDate={new Date()}
                />
            }
        </S.DatePickerArea>
    )
}

export default DatePicker;