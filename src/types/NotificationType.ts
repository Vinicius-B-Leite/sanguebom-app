export type NotificationType = {
    description: string,
    title: string,
    type: 'alert' | 'post',
    userUID: string,
    postID?: string,
    id: string
}