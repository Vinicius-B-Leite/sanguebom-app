import { api } from "."
import { PostType } from "../types/PostType"


type Props = {
    postID: string,
    token: string
}

export async function getOnePost({ postID, token }: Props) {
    return (await api.get<PostType>(`posts/single?postid=${postID}`, { headers: { Authorization: 'Bearer ' + token } })).data
}