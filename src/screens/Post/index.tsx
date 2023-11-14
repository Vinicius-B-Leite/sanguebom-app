import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StackHomeParamsList } from '../../routes/models';
import * as S from './styles'
import { useQuery } from '@tanstack/react-query';
import { getOnePost } from '../../api/getOnePost';
import PostDetails from '../../components/Post';
import HeaderGoBack from '../../components/HeaderGoBack';
import { useTheme } from 'styled-components/native';
import { ActivityIndicator, Text } from 'react-native';


type NavProp = StackScreenProps<StackHomeParamsList, 'Post'>

const Post: React.FC<NavProp> = ({ navigation, route }) => {
    const theme = useTheme()
    const { data, isLoading } = useQuery({
        queryKey: ['singlePost'],
        queryFn: () => getOnePost({ postID: route.params.postID })
    })


    return (
        <S.Container>
            <HeaderGoBack goBack={() => navigation.navigate('Home')} theme='contrast' title='Campanhas' />
            {
                isLoading ?
                    <ActivityIndicator style={{ marginTop: '5%' }} color={theme.colors.contrast_100} size={theme.icons.sm} />
                    :
                    data ?
                        <PostDetails info={data} />
                        :
                        <Text style={{ color: theme.colors.contrast_100, fontWeight: 'bold', fontSize: theme.fontSize.xxsm, margin: 20 }} >Esta campanha não está mais disponível</Text>
            }
        </S.Container>
    )
}

export default Post;