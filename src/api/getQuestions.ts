import { api } from ".";
import { QuestionType } from "../types/QuestionType";

export async function getQuestions() {
    return (await api.get<QuestionType[]>('questions')).data
}