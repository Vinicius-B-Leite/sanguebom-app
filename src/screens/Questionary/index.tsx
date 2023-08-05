import React, { useState } from 'react';
import * as S from './styles'
import HeaderGoBack from '../../components/HeaderGoBack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Progressbar from './components/Progessbar'
import Question from './components/Question';
import NextQuestion from './components/NextQuestion';
import { questions } from '../../utlis/questions';
import { QuestionsParamsList } from '../../routes/models';



type Nav = NavigationProp<QuestionsParamsList, 'Questionary'>

const Questionary: React.FC = () => {
    const navigation = useNavigation<Nav>()
    const [answareSelected, setAnswareSelected] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const handleSelectAnsware = (answare: string) => {
        setAnswareSelected(answare)
    }

    const handleNextAnsware = () => {
        if (answareSelected) {
            const isLastQuestion = (currentQuestion + 1) === questions.length
            const indexOfAnsware = questions[currentQuestion].answares.findIndex(v => v === answareSelected)
            const correctAnsware = questions[currentQuestion].correctAnswareIndex.includes(indexOfAnsware)

            if (!correctAnsware) {
                navigation.navigate('QuestionaryFeedback', { succes: false })
            }

            if (isLastQuestion && correctAnsware) {
                navigation.navigate('QuestionaryFeedback', { succes: true })
            }

            if (!isLastQuestion && correctAnsware) {
                setCurrentQuestion(old => old + 1)
                setAnswareSelected('')
            }
        }
    }


    return (
        <S.Container>
            <HeaderGoBack goBack={() => navigation.goBack()} theme='contrast' title='Questionário' />

            <S.Main>
                <Progressbar currentQuestion={currentQuestion + 1} totalQuestions={questions.length} />
                <Question
                    currentQuestion={questions[currentQuestion]}
                    handleSelectAnsware={handleSelectAnsware}
                    answareSelected={answareSelected}
                />
                <NextQuestion handleNextAnsware={handleNextAnsware} />
            </S.Main>
        </S.Container>
    )
}

export default Questionary;