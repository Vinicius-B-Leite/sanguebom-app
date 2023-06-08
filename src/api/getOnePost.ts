import { api } from "."
import { PostType } from "../types/PostType"


type Props = {
    postID: string,
}

export async function getOnePost({ postID }: Props) {
    return (await api.get<PostType>(`posts/single?postid=${postID}`)).data
}