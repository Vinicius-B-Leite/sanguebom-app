import { api } from ".";
import { QuestionType } from "../types/QuestionType";

export async function getQuestions(tokenJWT: string) {
    return (await api.get<QuestionType[]>('questions', { headers: { Authorization: 'Bearer ' + tokenJWT } })).data
}