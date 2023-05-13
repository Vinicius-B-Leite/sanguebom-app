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



type Nav = StackScreenProps<StackHomeParamsList, 'Home'>
const Home: React.FC<Nav> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const theme = useTheme()
  const [refreshFlatList, setRefreshFlatList] = useState(false)
  const dispatch = useDispatch()


  useQuery({
    queryKey: ['notificationLength'],
    queryFn: () => getNotificationLength({ token: user?.token ?? '', uid: user?.uid ?? '' }),
    onSuccess: (res) => {
      dispatch(setNotificationLength(res))
    }
  })

  const { data, fetchNextPage, isLoading, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, tokenJWT: user?.token ?? '' }),
    getNextPageParam: (lastPage, allPages) => lastPage.maxPage >= allPages.length + 1 ? allPages.length + 1 : undefined
  })


  const onRefreshFlatList = async () => {
    setRefreshFlatList(true)
    await refetch()
    setRefreshFlatList(false)
  }

  return (
    <S.Container>
      <Header onClickBell={() => navigation.navigate('Notification')} />
      {
        isLoading ?
          [1, 2, 3, 4].map(i => (
            <S.SkeletonArea key={i}>
              <S.SkeletonRow >
                <SkeletonContainer w={theme.vw * 0.1} h={theme.vw * 0.1} isCircle={true} />
                <SkeletonContainer w={theme.vw * 0.7} h={theme.vw * 0.1} />
              </S.SkeletonRow>
              <SkeletonContainer w={theme.vw * 0.8} h={theme.vw * 0.4} />
            </S.SkeletonArea>
          ))
          :
          <FlatList
            data={data?.pages.map(p => p.data).flat()}
            renderItem={({ item }) => <PostDetails enableMaxLenght={true} info={item} />}
            ListFooterComponent={() => hasNextPage ? <ActivityIndicator size={theme.icons.sm} color={theme.colors.contrast} /> : <></>}
            onEndReached={async () => {
              await fetchNextPage()
            }}
            refreshing={refreshFlatList}
            onRefresh={onRefreshFlatList}
          />
      }


    </S.Container>
  )
}

export default Home;