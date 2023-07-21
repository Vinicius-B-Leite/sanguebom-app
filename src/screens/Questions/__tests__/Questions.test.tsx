import React from 'react'
import { act, fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import * as apiService from '../../../api/getQuestions'
import Questions from '../index'
import { mocks } from './mocks'
import { QuestionType } from '../../../types/QuestionType'
import * as questionsStorage  from '../../../storage/questionsStorage'



const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    })
}))
describe('Questions', () => {
    let getQuestionsMock: jest.SpyInstance<Promise<QuestionType[]>, [], any> | null
    beforeEach(() => {
        getQuestionsMock = jest.spyOn(apiService, 'getQuestions')
            .mockResolvedValue(mocks.fakeQuestions)
    })

    afterEach(() => {
        getQuestionsMock = null
    })

    it('rendered', async () => {
        const { findByText } = renderWithProviders(<Questions />)

        expect(await findByText(/Sangue Bom/i)).toBeTruthy()
    })
    it('got storage questions when axios returned "Network Error"', async () => {
        jest.spyOn(questionsStorage, 'getQuestionsStorage').mockReturnValueOnce(mocks.fakeCacheQuestions)
        getQuestionsMock?.mockRejectedValue({ message: 'Network Error' })

        const { findByText } = renderWithProviders(<Questions />)

        expect(await findByText(mocks.fakeCacheQuestions[0].questions)).toBeTruthy()

    })
    it('saved in cache the posts from api ', async () => {
        renderWithProviders(<Questions />)

        await waitFor(() => expect(getQuestionsMock).toHaveBeenCalled())
        const postsInCache = questionsStorage.getQuestionsStorage()

        expect(postsInCache).toEqual(mocks.fakeQuestions)
    })
    it('navigated to Notification screen when bell icon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Questions />)

        const bellIcon = await findByTestId('bellIcon')

        fireEvent.press(bellIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'Notification' })
    })
    it('navigated to MyDonates screen when bell icon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Questions />)

        const bloodDonateIcon = await findByTestId('bloodDonateIcon')

        fireEvent.press(bloodDonateIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'MyDonates' })
    })
    it('refetched post on scroll down', async () => {

        const { findByTestId } = renderWithProviders(<Questions />)

        const questionsList = await findByTestId('questionsList')

        getQuestionsMock?.mockResolvedValue([...mocks.fakeQuestions, mocks.newQuestionFromRefetch])
        await act(() => questionsList.props.onRefresh())

        expect(questionsList.props.data).toContainEqual(mocks.newQuestionFromRefetch)
    })
})