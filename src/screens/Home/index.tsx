import React, { useEffect, useMemo, useState } from 'react';
import OneSignal from 'react-native-onesignal';
import Header from '../../components/Header';
import * as S from './styles'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { getPosts } from '../../api/getPosts';
import { StackScreenProps } from '@react-navigation/stack';
import { StackHomeParamsList } from '../../routes/models';
import { getNotificationLength } from '../../api/getNotificationLength';
import { setNotificationLength } from '../../feature/notification/notificationSlice';
import SkeletonPost from './components/SkeletonPost';
import PostList from './components/PostList';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { registerAppOneSignal } from '../../onesignal/registerAppOneSignal';
import { getPostsStorage, setPostsStorage } from '../../storage/postsStorage';
import { PostType } from 'src/types/PostType';
import { useNetInfo } from '@react-native-community/netinfo';


registerAppOneSignal()

type Nav = StackScreenProps<StackHomeParamsList, 'Home'>
const Home: React.FC<Nav> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const netinfo = useNetInfo()
  const offlineData = useMemo(() => {
    if (!netinfo.isConnected) return getPostsStorage()
  }, [netinfo])

  const { data, fetchNextPage, isLoading, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => lastPage.maxPage >= allPages.length + 1 ? allPages.length + 1 : undefined,
    onSuccess: (data) => {
      setPostsStorage(data.pages[0].data)      
    }
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
            posts={netinfo.isConnected ? data : offlineData}

            refetch={async () => {
              await refetch()
            }}
          />
      }


    </S.Container>
  )
}

export default Home;