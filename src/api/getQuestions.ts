import { api } from ".";

export async function getQuestions(tokenJWT: string) {
    return (await api.get('questions', { headers: { Authorization: 'Bearer ' + tokenJWT } })).data
}