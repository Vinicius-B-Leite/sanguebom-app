import { api } from "."



type Props = {
    bloodTypes: string[],
    bloodCollectorsID: string,
    status: boolean,
    description: string,
}

export async function createAlert({ bloodCollectorsID, bloodTypes, description, status }: Props) {
    return (await api.post('alert', {
        bloodTypes,
        bloodCollectorsID,
        status,
        description
    })).status
}