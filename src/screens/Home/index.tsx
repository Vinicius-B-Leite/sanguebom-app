import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { PostType } from '../../types/PostType';
import * as S from './styles'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { getPosts } from '../../api/getPosts';
import { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import PostDetails from '../../components/Post';
import Skeleton from '../../components/Skeleton';
import SkeletonContainer from '../../components/SkeletonContainer';
import { getNotificationLength } from '../../api/getNotificationLength';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNotificationLength } from '../../feature/notification/notificationSlice';
import SkeletonPost from './components/SkeletonPost';
import PostList from './components/PostList';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';



type Nav = StackScreenProps<StackHomeParamsList, 'Home'>
const Home: React.FC<Nav> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()



  useQuery({
    queryKey: ['notificationLength'],
    queryFn: () => getNotificationLength({ uid: user?.uid ?? '' }),
    onSuccess: (res) => {
      dispatch(setNotificationLength(res))
    },
    onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
  })

  const { data, fetchNextPage, isLoading, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, tokenJWT: user?.token ?? '' }),
    getNextPageParam: (lastPage, allPages) => lastPage.maxPage >= allPages.length + 1 ? allPages.length + 1 : undefined,
  })



  return (
    <S.Container>
      <Header onClickBell={() => navigation.navigate('Notification')} onClickBloodDonate={() => navigation.navigate('MyDonates')} />
      {
        isLoading ?
          [1, 2, 3, 4, 5].map(i => <SkeletonPost key={i} />)
          :
          <PostList

            fetchNextPage={async () => {
              await fetchNextPage()
            }}
            hasNextPage={hasNextPage || false}
            posts={data}

            refetch={async () => {
              await refetch()
            }}
          />
      }


    </S.Container>
  )
}

export default Home;