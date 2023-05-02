import { api } from "."
import { PostType } from "../types/PostType"



type Props = {
    page: number,
    tokenJWT: string
}

type APIResponse = {
    data: PostType[],
    maxPage: number
}

export async function getPosts({ page, tokenJWT }: Props) {
    return (await api.get<APIResponse>(`posts?page=${page}`, { headers: { Authorization: 'Bearer ' + tokenJWT } })).data
}