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


const PostDetails: React.FC<PostProps> = ({ info, enableMaxLenght }) => {
    const { bloodCollectors, createdAt, description } = info

    return (
        <S.Container>

            <HeaderPost avatarUrl={bloodCollectors.imageURL} username={bloodCollectors.username} />

            <Image
                style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width }}
                source={{ uri: baseURL + info?.bannerURL }}
            />

            <FooterPost adress={bloodCollectors.adress} createdAt={createdAt} description={description} enableMaxLength={enableMaxLenght || false} />

        </S.Container>
    )
}

export default PostDetails;