import { StackScreenProps } from '@react-navigation/stack';
import React, { lazy } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackHomeParamsList } from '../../routes/models';
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useQuery } from '@tanstack/react-query';
import { getOnePost } from '../../api/getOnePost';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import PostDetails from '../../components/Post';


type NavProp = StackScreenProps<StackHomeParamsList, 'Post'>

const Post: React.FC<NavProp> = ({ navigation, route }) => {

    const theme = useTheme()
    const user = useSelector((state: RootState) => state.user.user)
    const { data } = useQuery({
        queryKey: ['singlePost'],
        queryFn: () => getOnePost({ postID: route.params.postID, token: user?.token ?? '' })
    })


    return (
        <S.Container>
            <S.Header>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={theme.icons.sm} color={theme.colors.backgroundColor} />
                </TouchableOpacity>
                <S.Title>{data?.bloodCollectors?.username}</S.Title>
            </S.Header>

            {
                data && <PostDetails info={data} />
            }
        </S.Container>
    )
}

export default Post;