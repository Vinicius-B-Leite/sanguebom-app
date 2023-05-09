import { api } from "."



type Props = {
    bloodTypes: string[],
    bloodCollectorsID: string,
    status: boolean,
    description: string,
    token: string
}

export async function createAlert({ bloodCollectorsID, bloodTypes, description, status, token }: Props) {
    return await api.post(
        'alert',
        {
            bloodTypes,
            bloodCollectorsID,
            status,
            description
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
}