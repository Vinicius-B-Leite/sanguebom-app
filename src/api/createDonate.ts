import { api } from "."


type Props = {
    userID: string,
    bloodCollectorID: string,
    date: Date,
    token: string
}
export async function createDonate({ bloodCollectorID, date, token, userID }: Props) {
    return (await api.post(
        'donate',
        {
            userID,
            bloodCollectorID,
            date
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )).data
}