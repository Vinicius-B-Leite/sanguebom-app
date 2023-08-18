import React from 'react';
import * as S from './style'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { QuestionsParamsList } from '../../routes/models';
import SuccesFeedback from '../../assets/succesQuestionary.png'
import FailureFeedback from '../../assets/failureFeedback.png'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';



type Params = RouteProp<QuestionsParamsList, 'QuestionaryFeedback'>
type Nav = NavigationProp<QuestionsParamsList, 'QuestionaryFeedback'>
const QuestionaryFeedback: React.FC = () => {

    const isSucces = useRoute<Params>().params.succes
    const navigation = useNavigation<Nav>()

    const theme = useTheme()

    return (
        <S.Container>
            <S.GoBack onPress={() => navigation.navigate('Questions')}>
                <AntDesign name="arrowright" size={24} color={theme.colors.contrast_100} />
            </S.GoBack>
            <S.Title>
                {
                    isSucces ?
                        'Parabéns! Você está apto para doar sangue'
                        :
                        'Infelizmente você não está apto a doar sangue'
                }
            </S.Title>
            <S.SubTitle>
                {
                    isSucces ?
                        'Para doar seu sangue, verifique se está ocorrendo alguma campanha perto de você.'
                        :
                        'Verifique os requisitos para se tornar um doador para se preparar para a próxima doação'
                }
            </S.SubTitle>
            {
                isSucces ?
                    <S.ImageFeedback source={SuccesFeedback} resizeMode='contain' />
                    :
                    <S.ImageFeedback source={FailureFeedback} resizeMode='contain' />
            }
        </S.Container>
    )
}

export default QuestionaryFeedback;