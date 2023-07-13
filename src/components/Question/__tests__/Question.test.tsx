import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import Question from '../index'
import { QuestionType } from "../../../types/QuestionType";
import { act, fireEvent } from "@testing-library/react-native";



const fakeQuestion: QuestionType = {
    answare: 'question.Answare',
    id: '123123',
    questions: 'question.Question'
}

describe('Questions', () => {
    it('rendred', () => {
        const { getByText } = renderWithProviders(
            <Question
                item={fakeQuestion}
            />
        )

        expect(getByText(fakeQuestion.questions)).toBeTruthy()
    })

    it('oppened answare when question was clicked', () => {
        const { getByText } = renderWithProviders(
            <Question
                item={fakeQuestion}
            />
        )

        const openAnsware = getByText(fakeQuestion.questions)

        act(() => {
            fireEvent(openAnsware, 'press')
        })

        const answareText = getByText(fakeQuestion.answare)

        expect(answareText).toBeTruthy()
    })
    
})