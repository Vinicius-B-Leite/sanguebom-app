import React from 'react';
import { View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import * as S from './styles'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { QuestionsParamsList } from 'src/routes/models';



type Nav = NavigationProp<QuestionsParamsList, 'Questions'>
const QuestionaryButton: React.FC = () => {
    const { colors, icons } = useTheme()
    const navigation = useNavigation<Nav>()


    return (
        <S.ButtonArea onPress={() => navigation.navigate('Questionary')}>
            <Octicons name="tasklist" size={icons.sm} color={colors.oppositeContrast} />
            <S.Label>Questionário de aptidão</S.Label>
        </S.ButtonArea>
    )
}

export default QuestionaryButton;