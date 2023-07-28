import React from "react";
import { act, fireEvent, renderWithProviders, screen, waitFor } from '../../../utlis/test-utils/customRender'
import MyDonates from '../index'
import * as apiGetMyDonates from '../../../api/getMyDonates'
import * as apiGetBloodCollectors from '../../../api/getBloodCollectors'
import { mocks } from './mocks'



const renderComponentWithPreState = () => renderWithProviders(<MyDonates />, {
    preloadedState: {
        user: {
            user: mocks.fakeUser
        }
    }
})


const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: mockGoBack
    })
}))
describe('MyDonates', () => {

    beforeEach(() => {
        jest.spyOn(apiGetBloodCollectors, 'getBloodCollectors').mockResolvedValue([])
        jest.spyOn(apiGetMyDonates, 'getMyDonates').mockResolvedValue(mocks.fakeDonatesWithWaitDaysToDonate)
    })
    it('rendered', async () => {
        const { getByText } = renderComponentWithPreState()

        await waitFor(() => getByText(/Doações realizadas/i))

        expect(getByText(/Doações realizadas/i)).toBeTruthy()
    })
    it('showed block donate icon if the user has donated yet', async () => {

        const { findByTestId } = renderComponentWithPreState()
        expect(await findByTestId('blockDonateIcon')).toBeTruthy()
    })

    it('showed donate list', async () => {
        const { findByText } = renderComponentWithPreState()
        const firstElementList = await findByText(mocks.fakeDonatesWithWaitDaysToDonate.donates[0].bloodCollectors.username)
        expect(firstElementList).toBeTruthy()
    })

    it('enabled create donate button if wait days to donate >= 0', async () => {
        jest.spyOn(apiGetMyDonates, 'getMyDonates').mockResolvedValue(mocks.fakeDonatesWith0DaysToWait)

        const { findByText } = renderComponentWithPreState()

        const openModalBtn = await findByText('Cadastrar doação')
        expect(openModalBtn).toBeTruthy()

    })

    it('oppened modal', async () => {
        jest.clearAllMocks()
        jest.spyOn(apiGetMyDonates, 'getMyDonates').mockResolvedValue(mocks.fakeDonatesWith0DaysToWait)

        const { getByText, findByText } = renderComponentWithPreState()

        const createDonateButton = await findByText(/cadastrar doação/i)
        fireEvent.press(createDonateButton)



        expect(getByText(/Data/i)).toBeTruthy()
    })

    it('closed modal', async () => {
        jest.clearAllMocks()
        jest.spyOn(apiGetMyDonates, 'getMyDonates').mockResolvedValue(mocks.fakeDonatesWith0DaysToWait)

        const { getByTestId, findByText, queryByText } = renderComponentWithPreState()

        const createDonateButton = await findByText(/cadastrar doação/i)
        fireEvent.press(createDonateButton)

        const closeModalBgBtn = getByTestId('closeModalButton')
        fireEvent.press(closeModalBgBtn)

        expect(queryByText(/local/i)).toBeNull()
    })

    it('went back to home when clicked on header title', async () => {
        jest.useFakeTimers()
        const { findByTestId } = renderComponentWithPreState()

        fireEvent.press(await findByTestId('arrow-icon'))

        expect(mockGoBack).toHaveBeenCalled()
    })
})