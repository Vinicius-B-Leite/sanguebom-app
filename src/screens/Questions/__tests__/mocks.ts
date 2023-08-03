import { QuestionType } from "../../../types/QuestionType";
import { GenderType } from "../../../types/GenderType";
import { UserType } from "../../../types/UserType";


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
    } as UserType
}
export const mocks = {
    fakeQuestions,
    newQuestionFromRefetch,
    fakeCacheQuestions,
    fakeUser
}