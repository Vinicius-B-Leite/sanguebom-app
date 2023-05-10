import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { PostType } from '../../types/PostType';
import * as S from './style';
import { baseURL } from '../../api';
import AutoHeightImage from 'react-native-auto-height-image';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'


type PostProps = {
    info: PostType,
    enableMaxLenght?: boolean
}


const PostDetails: React.FC<PostProps> = ({ info, enableMaxLenght }) => {

    const [maxLength, setMathLength] = useState(150)

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
                    <S.ComunText>{
                        formatDistance(
                            new Date(info.createdAt),
                            new Date(),
                            {
                                locale: ptBR,
                                addSuffix: false
                            })
                    }</S.ComunText>
                </S.Deatils>

                <S.Description>
                    {
                        enableMaxLenght ?
                            info?.description.substring(0, maxLength) :
                            info.description
                    }
                    {
                        enableMaxLenght && maxLength <= info.description.length &&
                        <S.ReadMore onPress={() => setMathLength(old => old + 150)}>Ver mais</S.ReadMore>
                    }
                </S.Description>
            </S.Footer>
        </S.Container>
    )
}

export default PostDetails;