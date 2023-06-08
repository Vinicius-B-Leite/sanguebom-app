import { api } from "."


type Props = {
    userID: string,
    bloodCollectorID: string,
    date: Date,
}
export async function createDonate({ bloodCollectorID, date, userID }: Props) {
    return (await api.post(
        'donate',
        {
            userID,
            bloodCollectorID,
            date
        })).data
}