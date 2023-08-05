import React from 'react';
import * as S from './style'
import { Questionary } from '../../../../types/Questionary';
import { Circle, Svg } from 'react-native-svg';
import { useTheme } from 'styled-components/native';


type Props = {
    currentQuestion: Questionary,
    handleSelectAnsware: (answare: string) => void,
    answareSelected: string
}
const Question: React.FC<Props> = ({ currentQuestion, handleSelectAnsware, answareSelected }) => {
    const theme = useTheme()

    return (
        <S.QuestionContainer >
            <S.QuestionTitle>{currentQuestion.question}</S.QuestionTitle>
            {
                currentQuestion.answares.map(answare => (

                    <S.AnswareArea key={answare} onPress={() => handleSelectAnsware(answare)} selected={answareSelected === answare}>
                        <S.AnswareLabel>{answare}</S.AnswareLabel>
                        <Svg height="100%" width="10%" viewBox="0 0 100 100">
                            <Circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke={answareSelected === answare ? theme.colors.contrast_100 : theme.colors.text_100}
                                strokeWidth="5"
                            />
                            <Circle
                                cx="50"
                                cy="50"
                                r="25"
                                fill={answareSelected === answare ? theme.colors.contrast_100 : theme.colors.text_100}
                            />
                        </Svg>
                    </S.AnswareArea>

                ))
            }
        </S.QuestionContainer>
    )
}

export default Question;