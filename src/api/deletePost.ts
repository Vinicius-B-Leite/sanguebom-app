import { api } from ".";

export async function deletePost(id: string) {
    return await api.delete(`posts/delete?id=${id}`)
}