import React from 'react';
import { Dimensions } from 'react-native';
import { PostType } from '../../types/PostType';
import * as S from './style';
import { baseURL } from '../../api';
import AutoHeightImage from 'react-native-auto-height-image';


type PostProps = {
    info: PostType
}


const Post: React.FC<PostProps> = ({ info }) => {

    return (
        <S.Container>
            <S.Header>
                <S.Avatar source={{ uri: baseURL + info?.bloodCollectors?.imageURL || '' }} />
                <S.Username>{info?.bloodCollectors?.username}</S.Username>
            </S.Header>

            <AutoHeightImage
                width={Dimensions.get('screen').width}
                source={{ uri: baseURL + info?.bannerURL }}
                maxHeight={Dimensions.get('screen').height * 0.7}
            />

            <S.Footer>
                <S.Deatils>
                    <S.ComunText>{info?.adress}</S.ComunText>
                    <S.ComunText>1 dia atrás</S.ComunText>
                </S.Deatils>

                <S.Description numberOfLines={4}>{info?.description}</S.Description>
            </S.Footer>
        </S.Container>
    )
}

export default Post;