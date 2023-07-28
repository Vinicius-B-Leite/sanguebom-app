import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import * as S from './styles'
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../api/getQuestions';
import { AxiosError } from 'axios';
import { useTheme } from 'styled-components/native';
import { QuestionsScreenProps } from '../../routes/models';
import SkeletonContainer from '../../components/SkeletonContainer';
import QuestionList from './components/QuestionList';
import { QuestionType } from '../../types/QuestionType';
import { getQuestionsStorage, setQuestionsStorage } from '../../storage/questionsStorage';
import { NavigationProp, useNavigation } from '@react-navigation/native';



type Nav = NavigationProp<QuestionsScreenProps>
const Questions: React.FC = () => {

  const theme = useTheme()
  const navigation = useNavigation<Nav>()
  
  const [offlineQuestions, setOfflineQuestions] = useState<QuestionType[]>([])

  const { data, isLoading, refetch } = useQuery(
    ['questions'],
    () => getQuestions(),
    {
      onError: (err: AxiosError) => {
        if (err.message === 'Network Error') {
          const storageQuestions = getQuestionsStorage()
          storageQuestions && setOfflineQuestions(storageQuestions)
        }
      },
      onSuccess: (res) => {
        setQuestionsStorage(res)
      }
    }
  )


  const handleRefetch = async () => {
    await refetch()
  }

  return (
    <S.Container>
      <Header
        onClickBell={() => navigation.navigate('HomeStack', { screen: 'Notification' })}
        onClickBloodDonate={() => navigation.navigate('HomeStack', { screen: 'MyDonates' })}
      />
      {
        isLoading ?
          <View style={{ padding: '5%' }}>
            <SkeletonContainer w={theme.vw * 9} h={theme.vh * 0.1} />
          </View>
          :
          <QuestionList questions={data || offlineQuestions} refetch={handleRefetch} />
      }
    </S.Container>
  )
}

export default Questions;