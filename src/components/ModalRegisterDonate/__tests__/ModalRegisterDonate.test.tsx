import React from 'react'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import ModalRegisterDonate from '../index'
import * as apiService from '../../../api/getBloodCollectors'
import { HospitalType } from '../../../types/HospitalType'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

const fakeHospital: HospitalType[] = [{
    adress: 'bloodCollectors.adress',
    alert: null,
    email: 'bloodCollectors.email',
    imageURL: 'bloodCollectors.imageURL',
    lat: 123123,
    lng: 123123,
    phoneNumber: 'bloodCollectors.phoneNumber',
    uid: 'bloodCollectors.uid',
    username: 'bloodCollectors.username',
}]
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

describe('ModalRegisterDonate', () => {
    beforeAll(() => {
        jest.spyOn(apiService, 'getBloodCollectors').mockResolvedValue(fakeHospital)
    })
    beforeEach(() => {
        jest.useFakeTimers()
    })

    it('rendered', async () => {

        const { getByText } = renderWithProviders(
            <ModalRegisterDonate
                closeModal={() => { }}
                visible={true}
            />
        )

        const element =  getByText(/Cadastrar Doação/i)
        expect(element).toBeTruthy()
    })

    it('selected a bloodCollector item when DropDown was openned', async () => {

        const { getByText , findByText} = renderWithProviders(
            <ModalRegisterDonate
                closeModal={() => { }}
                visible={true}
            />
        )

        const dropDownElement = getByText(/Selecione um ponto/i)
        fireEvent.press(dropDownElement)
        const bloodCollectorItem = await findByText(fakeHospital[0].username)

        fireEvent(bloodCollectorItem, 'press')
        expect(dropDownElement.props.children).toBe(fakeHospital[0].username)
    })

    it('selected the date of donation', async () => {

        const dateSelected = new Date()

        const { getByTestId, getByText, findByTestId } = renderWithProviders(
            <ModalRegisterDonate
                closeModal={jest.fn()}
                visible={true}
            />
        )

        const openCalendarButton = await findByTestId('openCalendarButton')

        await act(() => {
            fireEvent(openCalendarButton, 'press')
        })

        const calendarPicker = getByTestId('calendarPicker')

        fireEvent(calendarPicker, 'onChange', ...createDateTimeSetEvtParams(dateSelected))


        expect(getByText(dateSelected.toLocaleDateString())).toBeTruthy()
    })

})