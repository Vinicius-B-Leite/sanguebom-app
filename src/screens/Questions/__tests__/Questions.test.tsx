import React from 'react'
import { act, fireEvent, renderWithProviders, waitFor } from '../../../utlis/test-utils/customRender'
import * as apiService from '../../../api/getQuestions'
import Questions from '../index'
import { mocks } from './mocks'
import { QuestionType } from '../../../types/QuestionType'
import * as questionsStorage from '../../../storage/questionsStorage'



const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    })
}))

const comunRender = () => renderWithProviders(
    <Questions />, {
    preloadedState: {
        notification: { length: 10 },
        user: mocks.fakeUser
    }
})

describe('Questions', () => {
    beforeEach(() => {
        mockNavigate.mockReset()
    })

    it('rendered', async () => {
        jest.spyOn(apiService, 'getQuestions').mockResolvedValue(mocks.fakeQuestions)

        const { findByText } = comunRender()

        expect(await findByText(/Sangue Bom/i)).toBeTruthy()
    })
    it('got storage questions when axios returned "Network Error"', async () => {
        jest.spyOn(apiService, 'getQuestions').mockRejectedValue({ message: 'Network Error' })
        jest.spyOn(questionsStorage, 'getQuestionsStorage').mockReturnValueOnce(mocks.fakeCacheQuestions)

        const { findByText } = comunRender()


        expect(await findByText(mocks.fakeCacheQuestions[0].questions)).toBeTruthy()
    })
    it('saved in cache the posts from api ', async () => {
        jest.useFakeTimers()
        const getQuestionsMock = jest.spyOn(apiService, 'getQuestions').mockResolvedValue(mocks.fakeQuestions)

        comunRender()

        await waitFor(() => expect(getQuestionsMock).toHaveBeenCalled())

        const postsInCache = questionsStorage.getQuestionsStorage()

        expect(postsInCache).toEqual(mocks.fakeQuestions)
    })
    it('navigated to Notification screen when bell icon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Questions />, { preloadedState: { notification: { length: 10 } } })

        const bellIcon = await findByTestId('bellIcon')

        fireEvent.press(bellIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'Notification' })
    })
    it('navigated to MyDonates screen when bell icon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Questions />, { preloadedState: { notification: { length: 10 } } })

        const bloodDonateIcon = await findByTestId('bloodDonateIcon')

        fireEvent.press(bloodDonateIcon)

        expect(mockNavigate).toHaveBeenCalledWith('HomeStack', { screen: 'MyDonates' })
    })
    it('navigated to Questionary screen when user clicked on questionary button', async() => {
        const { findByText } = renderWithProviders(<Questions />, { preloadedState: { notification: { length: 10 } } })

        const questionaryBtn = await findByText('Questionário de aptdão', {exact: false})
        fireEvent.press(questionaryBtn)

        expect(mockNavigate).toHaveBeenCalledWith('Questionary')
    })
    it('refetched post on scroll down', async () => {
        jest.spyOn(apiService, 'getQuestions').mockResolvedValue([...mocks.fakeQuestions, mocks.newQuestionFromRefetch])

        const { findByTestId } = renderWithProviders(<Questions />, { preloadedState: { notification: { length: 10 } } })

        const questionsList = await findByTestId('questionsList')

        await act(() => questionsList.props.onRefresh())

        expect(questionsList.props.data).toContainEqual(mocks.newQuestionFromRefetch)
    })
})