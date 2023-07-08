import { QuestionType } from "../types/QuestionType"
import { QUESTIONS_KEY, storage } from "./storageConfig"

export const setQuestionsStorage = (questions: QuestionType[]) => {
    storage.set(QUESTIONS_KEY, JSON.stringify(questions))
}

export const getQuestionsStorage = () => {
    const storageResponse = storage.getString(QUESTIONS_KEY)
    const questions = storageResponse ? JSON.parse(storageResponse) as QuestionType[] : null

    return questions
}