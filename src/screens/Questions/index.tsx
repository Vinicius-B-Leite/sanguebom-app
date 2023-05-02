import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
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


const Questions: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const theme = useTheme()
  const { data, isLoading } = useQuery(
    ['questions'],
    () => getQuestions(user?.token ?? ''),
    {
      onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
    }
  )

  return (
    <S.Container>
      <Header />
      {
        isLoading ? <ActivityIndicator size={theme.icons.md} color={theme.colors.contrast} /> : <FlatList
          contentContainerStyle={{ padding: '5%' }}
          data={data}
          renderItem={({ item }) => <Question item={item} />}
        />
      }
    </S.Container>
  )
}

export default Questions;