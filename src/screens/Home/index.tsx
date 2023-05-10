import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { PostType } from '../../types/PostType';
import * as S from './styles'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { getPosts } from '../../api/getPosts';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import PostDetails from '../../components/Post';



type Nav = StackScreenProps<StackHomeParamsList, 'Home'>
const Home: React.FC<Nav> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const theme = useTheme()

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, tokenJWT: user?.token ?? '' }),
    getNextPageParam: (lastPage, allPages) => lastPage.maxPage >= allPages.length + 1 ? allPages.length + 1 : undefined
  })


  return (
    <S.Container>
      <Header onClickBell={() => navigation.navigate('Notification')}/>
      {
        isLoading ?
          <ActivityIndicator size={theme.icons.md} color={theme.colors.contrast} />
          :
          <FlatList
            data={data?.pages.map(p => p.data).flat()}
            renderItem={({ item }) => <PostDetails enableMaxLenght={true} info={item} />}
            ListFooterComponent={() => hasNextPage ? <ActivityIndicator size={theme.icons.sm} color={theme.colors.contrast} /> : <></>}
            onEndReached={async () => {
              await fetchNextPage()
            }}
          />
      }
    </S.Container>
  )
}

export default Home;