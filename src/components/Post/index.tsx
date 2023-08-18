import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, Image } from 'react-native';
import { PostType } from '../../types/PostType';
import * as S from './style';
import { baseURL } from '../../api';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import HeaderPost from './components/HeaderPost';
import FooterPost from './components/FooterPost';


type PostProps = {
    info: PostType,
    enableMaxLenght?: boolean
}

const WIDTH = Dimensions.get('screen').width


const PostDetails: React.FC<PostProps> = ({ info, enableMaxLenght }) => {
    const { bloodCollectors, createdAt, description } = info
    const [imageHeight, setImageHeight] = useState(0)

    Image.getSize(baseURL + info.bannerURL, (width1, height1) => {
        setImageHeight(height1 * (WIDTH / width1))
    }, (error) => {
        console.log("ScaledImage,Image.getSize failed with error: ", error)
    })

    
    return (
        <S.Container>

            <HeaderPost avatarUrl={bloodCollectors?.imageURL} username={bloodCollectors?.username} />

            <Image
                style={{ width: WIDTH, height: imageHeight }}
                source={{ uri: baseURL + info.bannerURL }}
            />

            <FooterPost
                adress={bloodCollectors?.adress}
                createdAt={createdAt}
                description={description}
                enableMaxLength={enableMaxLenght || false}
            />

        </S.Container>
    )
}

export default PostDetails;