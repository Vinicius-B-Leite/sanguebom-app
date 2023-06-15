import { StackScreenProps } from '@react-navigation/stack';
import React, { lazy } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackHomeParamsList } from '../../routes/models';
import * as S from './styles'
import { useTheme } from 'styled-components/native';
import { useQuery } from '@tanstack/react-query';
import { getOnePost } from '../../api/getOnePost';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import PostDetails from '../../components/Post';
import HeaderGoBack from '../../components/HeaderGoBack';


type NavProp = StackScreenProps<StackHomeParamsList, 'Post'>

const Post: React.FC<NavProp> = ({ navigation, route }) => {

    const { data } = useQuery({
        queryKey: ['singlePost'],
        queryFn: () => getOnePost({ postID: route.params.postID })
    })


    return (
        <S.Container>
            <HeaderGoBack goBack={() => navigation.goBack()} theme='contrast' title='Campanhas' />
            {
                data && <PostDetails info={data} />
            }
        </S.Container>
    )
}

export default Post;