import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import DatePiker from './DatePicker'
import * as apiService from '../../../api/createDonate'
import { act, fireEvent } from "@testing-library/react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import SubmitButton from './SubmitButton'
import { GenderType } from "../../../types/GenderType";

const createDateTimeSetEvtParams = (
  date: Date,
): [DateTimePickerEvent, Date] => {
  return [
    {
      type: 'set',
      nativeEvent: {
        timestamp: date.getTime(),
      },
    },
    date,
  ];
};
const fakeUser = {
  user: {
    uid: "123123123",
    email: 'email',
    password: "23123",
    token: '11111',
    type: 'donors',
    username: 'username',
    bloodType: 'A+',
    gender: 'male' as GenderType
  }
}

describe('ModalRegisterDonateComponents', () => {
  describe('DatePicker', () => {
    it('called handleOpenCallendar and selected a date', async () => {
      const selectDateMock = jest.fn()
      const dateSelected = new Date()
      const newDateSelected = new Date()

      const { getByTestId, getByText } = renderWithProviders(
        <DatePiker
          dateSelected={dateSelected}
          selectDate={selectDateMock}
        />
      )

      const openCalendarButton = getByTestId('openCalendarButton')
      fireEvent(openCalendarButton, 'press')

      const datePickerElement = getByTestId('calendarPicker')
      fireEvent(datePickerElement, 'onChange', ...createDateTimeSetEvtParams(newDateSelected))

      const day = newDateSelected.getDate()
      const month = newDateSelected.getMonth() + 1
      const year = newDateSelected.getFullYear()
      
      expect(getByText(`${day}/${month}/${year}`)).toBeTruthy()
    })
  })

  describe('SubmitButton', () => {
    it('DIDNT called mutate in handleSubmit when bloodCollectorId was undefined', () => {
      const closeModalMock = jest.fn()


      const { getByText } = renderWithProviders(
        <SubmitButton
          bloodCollectorID={undefined}
          closeModal={closeModalMock}
          date={new Date()}
        />
      )


      const buttonElement = getByText(/cadastrar/i)
      fireEvent(buttonElement, 'press')


      expect(closeModalMock).not.toHaveBeenCalled()
    })
    it('called mutate in handleSubmit when bloodCollectorId was passed', async () => {
      jest.spyOn(apiService, 'createDonate').mockResolvedValueOnce(200)
      jest.useFakeTimers()
      const closeModalMock = jest.fn()


      const { getByText } = renderWithProviders(
        <SubmitButton
          bloodCollectorID='123123'
          closeModal={closeModalMock}
          date={new Date()}
        />,
        {
          preloadedState: { user: fakeUser }
        }
      )


      const buttonElement = getByText(/cadastrar/i)
      await act(() => {
        fireEvent(buttonElement, 'press')
      })


      expect(closeModalMock).toHaveBeenCalled()

    })
  })
})