import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../components/Header';
import * as S from './styles'
import { useInfiniteQuery } from '@tanstack/react-query';


import { getPosts } from '../../api/getPosts';

import { StackHomeParamsList } from '../../routes/models';
import SkeletonPost from './components/SkeletonPost';
import PostList from './components/PostList';
import { registerAppOneSignal } from '../../onesignal/registerAppOneSignal';
import { getPostsStorage, setPostsStorage } from '../../storage/postsStorage';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationProp, useNavigation } from '@react-navigation/native';


registerAppOneSignal()

type Nav = NavigationProp<StackHomeParamsList, 'Home'>
const Home: React.FC = () => {
  const netinfo = useNetInfo()
  const navigation = useNavigation<Nav>()



  const offlineData = useMemo(() => {
    if (!netinfo.isConnected) return getPostsStorage()
  }, [netinfo])

  const { data, fetchNextPage, isLoading, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => lastPage.maxPage >= allPages.length + 1 ? allPages.length + 1 : undefined,
    onSuccess: (data) => {
      setPostsStorage(data.pages[0].data)
    },
  })

  return (
    <S.Container>
      <Header
        onClickBell={() => navigation.navigate('Notification')}
        onClickBloodDonate={() => navigation.navigate('MyDonates')}
      />

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