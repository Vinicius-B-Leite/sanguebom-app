import { api } from "."
import { PostType } from "../types/PostType"



type Props = {
    page: number,
}

export type InfinetePosts = {
    data: PostType[],
    maxPage: number
}

export async function getPosts({ page }: Props) {
    return (await api.get<InfinetePosts>(`posts?page=${page}`)).data
}