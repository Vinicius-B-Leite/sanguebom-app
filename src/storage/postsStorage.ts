import { PostType } from "../types/PostType";
import { POSTS_KEY, storage } from "./storageConfig";

export const setPostsStorage = (posts: PostType[]) => {
    storage.set(POSTS_KEY, JSON.stringify(posts))
}

export const getPostsStorage = () => {
    const storageResponse = storage.getString(POSTS_KEY)
    const posts = storageResponse ? JSON.parse(storageResponse) as PostType[] : null
    return posts
}