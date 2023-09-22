import React, { useState, useEffect } from 'react';
import { Dimensions, View, Image } from 'react-native';
import { PostType } from '../../types/PostType';
import * as S from './style';
import { baseURL } from '../../api';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import HeaderPost from './components/HeaderPost';
import FooterPost from './components/FooterPost';
import { useResponsiveImageView } from 'react-native-responsive-image-view';


type PostProps = {
    info: PostType,
    enableMaxLenght?: boolean
}



const PostDetails: React.FC<PostProps> = ({ info, enableMaxLenght }) => {
    const { bloodCollectors, createdAt, description } = info
    const { getViewProps, getImageProps, error } = useResponsiveImageView({
        source: { uri: baseURL + info.bannerURL },
    });

    return (
        <S.Container>

            <HeaderPost avatarUrl={bloodCollectors?.imageURL} username={bloodCollectors?.username} />

            {
                !error &&
                <View {...getViewProps()}>
                    <Image {...getImageProps()} />
                </View>
            }

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