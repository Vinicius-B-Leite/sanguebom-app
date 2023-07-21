import { QuestionType } from "../../../types/QuestionType";


const fakeQuestions: QuestionType[] = [
    {
        answare: 'question.anware',
        id: 'question.id1',
        questions: 'question.questions',
    },
    {
        answare: 'question.anware',
        id: 'question.id2',
        questions: 'question.questions',
    },
    {
        answare: 'question.anware',
        id: 'question.id3',
        questions: 'question.questions',
    },
]
const fakeCacheQuestions: QuestionType[] = [
    {
        answare: 'questionCache.anware',
        id: 'questionCache.id1',
        questions: 'questionCache.questions1',
    },
    {
        answare: 'questionCache.anware',
        id: 'questionCache.id2',
        questions: 'questionCache.questions2',
    },
    {
        answare: 'questionCache.anware',
        id: 'questionCache.id3',
        questions: 'questionCache.questions3',
    },
]

const newQuestionFromRefetch = {
    answare: 'newQuestion.answare',
    id: 'newQuestion.id',
    questions: 'newQuestion.questions'
}
export const mocks = {
    fakeQuestions,
    newQuestionFromRefetch,
    fakeCacheQuestions
}