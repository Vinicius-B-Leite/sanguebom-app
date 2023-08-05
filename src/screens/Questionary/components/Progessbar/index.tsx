import React from 'react';
import * as S from './styles'



type Props = {
    currentQuestion: number,
    totalQuestions: number
}
const Progessbar: React.FC<Props> = ({ currentQuestion, totalQuestions }) => {
    const porcentage = (currentQuestion / totalQuestions)  * 100
    return (
        <S.Container>
            <S.QuestionArea>
                <S.QuestionNumber>{currentQuestion}</S.QuestionNumber>
                <S.QuestionNumber>{currentQuestion}/{totalQuestions}</S.QuestionNumber>
            </S.QuestionArea>
            <S.ProgressBarArea>
                <S.Progress testID='progressView' style={{ width: porcentage + '%' }} />
            </S.ProgressBarArea>
        </S.Container>
    )
}

export default Progessbar;