import React from "react";
import Questionary from '../index'
import { fireEvent, renderWithProviders } from '../../../utlis/test-utils/customRender'
import { questions } from "../../../utlis/questions";
import * as mockQuestions from "../../../utlis/questions";

const mockNavigate = jest.fn()
const mockGoback = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
        goBack: mockGoback
    })
}))

describe('Questionary', () => {
    it('rendered', () => {
        const { getByText } = renderWithProviders(<Questionary />)

        expect(getByText('Questionário')).toBeTruthy()
    })
    it('went back to Questions screen when arrow-icon was clicked', async () => {
        const { findByTestId } = renderWithProviders(<Questionary />)

        const arrowIcon = await findByTestId('arrow-icon')
        fireEvent.press(arrowIcon)

        expect(mockGoback).toHaveBeenCalled()
    })
    it('showed current question number and total question', () => {
        const { getByText } = renderWithProviders(<Questionary />)

        expect(getByText(`1/${questions.length}`)).toBeTruthy()
    })
    it('did nothing if it clicked on submit button without selected answare', () =>{
        const { getByText } = renderWithProviders(<Questionary />)

        const submitBtn = getByText(/Próxima/i)
        fireEvent.press(submitBtn)

        expect(getByText(questions[0].question)).toBeTruthy()
    })
    it('navigated to QuestionaryFeedback screen with succes == false param when it selected wrong answare', () => {
        const { getByText } = renderWithProviders(<Questionary />)

        const lastAnware = getByText(/Menos de um mês/i)
        fireEvent.press(lastAnware)

        const submitBtn = getByText(/Próxima/i)
        fireEvent.press(submitBtn)

        expect(mockNavigate).toHaveBeenCalledWith('QuestionaryFeedback', { succes: false })
    })
    describe('selected correct answare', () => {
        it('went to the next question', () => {
            const { getByText, } = renderWithProviders(<Questionary />)

            const lastAnware = getByText(/Há quatro meses/i)
            fireEvent.press(lastAnware)

            const submitBtn = getByText(/Próxima/i)
            fireEvent.press(submitBtn)

            const nextQuestion = getByText(questions[1].question)
            expect(nextQuestion).toBeTruthy()
        })
        it('updated progress bar', () => {
            const { getByText, getByTestId } = renderWithProviders(<Questionary />)

            const lastAnware = getByText(/Há quatro meses/i)
            fireEvent.press(lastAnware)

            const submitBtn = getByText(/Próxima/i)
            fireEvent.press(submitBtn)

            const progressBarNumber = getByText(`2/${questions.length}`)
            const progressView = getByTestId('progressView')

            const porcentageExpect = (2 / questions.length) * 100

            expect(progressBarNumber).toBeTruthy()
            expect(progressView.props.style[1].width).toBe(`${porcentageExpect}%`)
        })
        it('navigated to QuestionaryFeedback screen with succes param when last question was selected correctly', () => {
            // @ts-ignore
            mockQuestions.questions = [
                {
                    question: 'Qual foi a última vez que você doou sangue?',
                    answares: [
                        'Menos de um mês',
                        'Último mês',
                        'Há dois meses',
                        'Há três meses',
                        'Há quatro meses',
                    ],
                    correctAnswareIndex: [2, 3, 4]
                },
            ]
            const { getByText } = renderWithProviders(<Questionary />)

            const lastAnware = getByText(/Há quatro meses/i)
            fireEvent.press(lastAnware)

            const submitBtn = getByText(/Próxima/i)
            fireEvent.press(submitBtn)

            expect(mockNavigate).toHaveBeenCalledWith('QuestionaryFeedback', { succes: true })
        })
    })
})