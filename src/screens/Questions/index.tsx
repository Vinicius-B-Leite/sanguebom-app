import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import Header from '../../components/Header';
import Question from '../../components/Question';
import * as S from './styles'
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../api/getQuestions';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { useTheme } from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamsList, QuestionsScreenProps } from '../../routes/models';
import SkeletonContainer from '../../components/SkeletonContainer';



type Nav = QuestionsScreenProps
const Questions: React.FC<Nav> = ({ navigation, route }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const theme = useTheme()
  const [refreshList, setRefreshList] = useState(false)
  const { data, isLoading, refetch } = useQuery(
    ['questions'],
    () => getQuestions(user?.token ?? ''),
    {
      onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
    }
  )

  const handleRefresh = async () => {
    setRefreshList(true)
    await refetch()
    setRefreshList(false)
  }

  return (
    <S.Container>
      <Header onClickBell={() => navigation.navigate('Notification')} />
      {
        isLoading ?
          <View style={{ padding: '5%' }}>
            <SkeletonContainer w={theme.vw * 9} h={theme.vh * 0.1} />
          </View>
          :
          <FlatList
            contentContainerStyle={{ padding: '5%' }}
            data={data}
            renderItem={({ item }) => <Question item={item} />}
            refreshing={refreshList}
            onRefresh={handleRefresh}
          />
      }
    </S.Container>
  )
}

export default Questions;