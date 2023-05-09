import axios from "axios";
import { api } from "./index";

type Props = {
    userJWT: string,
    linkRedirect: string,
    adress: string,
    description: string,
    bloodCollectorsID: string,
    banner: { uri: string, name: string, type: string }
}

export async function createPost({ adress, banner, bloodCollectorsID, description, userJWT, linkRedirect }: Props) {


    const form = new FormData();

    form.append('adress', adress);
    form.append('bloodCollectorsID', bloodCollectorsID);
    form.append('description', description);
    form.append('linkRedirect', linkRedirect);
    const ext = banner.uri.substring(banner.uri.lastIndexOf('.') + 1)
    form.append('banner', {
        name: banner.name + '.' + ext,
        uri: banner.uri,
        type: banner.type + '/' + ext,

    });


    return await api.post(
        'posts',
        form,
        {
            headers: {
                Authorization: 'Bearer ' + userJWT,
                "Content-Type": "multipart/form-data"
            }
        })
}