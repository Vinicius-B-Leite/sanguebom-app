import { api } from "."
import { PostType } from "../types/PostType"



type Props = {
    page: number,
    tokenJWT: string
}

export type InfinetePosts = {
    data: PostType[],
    maxPage: number
}

export async function getPosts({ page, tokenJWT }: Props) {
    return (await api.get<InfinetePosts>(`posts?page=${page}`, { headers: { Authorization: 'Bearer ' + tokenJWT } })).data
}