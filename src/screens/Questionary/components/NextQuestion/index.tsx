import React from 'react';
import * as S from './styles'


type Props = {
    handleNextAnsware: () => void
}
const NextQuestion: React.FC<Props> = ({ handleNextAnsware }) => {
    return (
        <S.NextQuestionArea onPress={handleNextAnsware}>
            <S.NextQuestionLabel>Próxima</S.NextQuestionLabel>
        </S.NextQuestionArea>
    )
}

export default NextQuestion;