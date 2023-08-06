import React from 'react'
import { fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import Search from '../index'
import * as apiService from '../../../api/getBloodCollectors'
import * as createAlert from '../../../api/createAlert'
import * as locationService from '../../../utlis/getLocation'
import { mocks } from './mocks'
import { darkMode } from '../../../theme/darkMode'


jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props: any) => {
        return <View {...props}>{props.children}</View>;
    }
    const MockMarker = (props: any) => {
        return <View  {...props} >{props.children}</View>;
    }
    return {
        __esModule: true,
        default: MockMapView,
        Marker: MockMarker,
    };
});

const mockGoback = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: mockGoback
    })
}))

const mockinvalidateQueries = jest.fn()

jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQueryClient: () => ({
        invalidateQueries: mockinvalidateQueries
    }),
}));

describe('Search', () => {

    beforeEach(() => {
        jest.spyOn(apiService, 'getBloodCollectors').mockResolvedValueOnce(mocks.fakeBloodCollectorList)
        jest.spyOn(locationService, 'getLocation').mockResolvedValueOnce({ lat: mocks.fakeBloodCollector.lat, lng: mocks.fakeBloodCollector.lng })
    })

    it('rendered', async () => {
        const { findByPlaceholderText, debug } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser }
        })

        expect(await findByPlaceholderText('Pesquise por um ponto de coleta')).toBeTruthy()
    })
    it('went back if it clicked on arrowleft and changed icon color when theme is dark', async () => {
        const { findByTestId, debug } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser },
        }, 'dark')

        const arrowleft = await findByTestId('arrowleft')
        fireEvent.press(arrowleft)

        expect(arrowleft.props.style[0].color).toEqual(darkMode.colors.text_100)
        expect(mockGoback).toHaveBeenCalled()

    })
    it('searched bloodCollectors when typing on search input', async () => {
        const { findByPlaceholderText, findByText } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser }
        })

        const searchInput = await findByPlaceholderText(/Pesquise por um ponto de coleta/i)
        fireEvent.changeText(searchInput, 'name')

        const bloodCollectorSearched = await findByText(mocks.fakeBloodCollector.username)

        expect(bloodCollectorSearched).toBeTruthy()
    })
    it('did NOT searched bloodCollectors when index of bloodCollector >= 3', async () => {
        const { findByPlaceholderText, queryByText } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser }
        })

        const searchInput = await findByPlaceholderText(/Pesquise por um ponto de coleta/i)
        fireEvent.changeText(searchInput, 'name')

        const bloodCollectorSearched = queryByText(mocks.fakeBloodCollectorList[3].username)

        expect(bloodCollectorSearched).not.toBeTruthy()
    })
    it('focused on bloodCollector when search it and selected', async () => {

        const { findByPlaceholderText, findByText, findByTestId } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser }
        })


        const searchInput = await findByPlaceholderText(/Pesquise por um ponto de coleta/i)
        fireEvent.changeText(searchInput, 'name')

        const bloodCollectorSearched = await findByText(mocks.fakeBloodCollector.username)
        fireEvent.press(bloodCollectorSearched)

        const mapView = await findByTestId('mapview')
        expect(mapView.props.region.latitude).toBe(mocks.fakeBloodCollector.lat)
    })
    it('showed the alert info if the blood collector was in alert', async () => {
        const { findByTestId } = renderWithProviders(<Search />, {
            preloadedState: { user: mocks.fakeUser }
        })

        const markerView = await findByTestId('marker_0')
        fireEvent.press(markerView)

        const alertInfoView = await findByTestId('alertInfoView')
        expect(alertInfoView).toBeTruthy()

    })
    it('created a alert', async () => {
        jest.useFakeTimers()
        const createAlertSpy = jest.spyOn(createAlert, 'createAlert').mockResolvedValueOnce(200)

        const { findByTestId, getByPlaceholderText, getByText, debug } = renderWithProviders(<Search />, {
            preloadedState: { user: { user: mocks.fakeUserBloodCollector } }
        })

        const alertTriangleIcon = await findByTestId('alertTriangleIcon')
        fireEvent.press(alertTriangleIcon)

        const bloodType_O = await findByTestId('bloodType_O-')
        fireEvent.press(bloodType_O)

        const messageInput = getByPlaceholderText(/Mensagem/i)
        fireEvent.changeText(messageInput, 'Ipsum ipsum irure ullamco pariatur est tempor eiusmod elit qui tempor incididunt. Dolor consequat voluptate cillum culpa aute qui magna eu sunt magna ea sint nisi. Velit mollit nisi cupidatat velit veniam dolore sunt reprehenderit esse ad eiusmod sint enim.')

        const submitBtn = getByText(/Criar/i)
        fireEvent.press(submitBtn)

        await waitFor(() => {
            expect(createAlertSpy).toHaveBeenCalled()
        })

        expect(mockinvalidateQueries).toHaveBeenCalled()
    })
})