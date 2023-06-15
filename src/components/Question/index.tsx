import React, { useState } from 'react';
import { QuestionType } from '../../types/QuestionType';
import * as S from './style'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';




type QuestionProps = {
    item: QuestionType
}

const Question: React.FC<QuestionProps> = ({ item }) => {
    const { colors, icons } = useTheme()
    const [descriptionVisible, setDescriptionVisible] = useState(false)


    return (
        <S.Container>
            <S.Header>
                <S.Question onPress={() => setDescriptionVisible(!descriptionVisible)}>{item.questions}</S.Question>
                <S.OpenDescription onPress={() => setDescriptionVisible(!descriptionVisible)}>
                    {
                        descriptionVisible ?
                            <AntDesign name="up" size={icons.vvsm} color={colors.text_200} />
                            :
                            <AntDesign name="down" size={icons.vvsm} color={colors.text_200} />

                    }
                </S.OpenDescription>
            </S.Header>
            {descriptionVisible && <S.Description>{item.answare}</S.Description>}
        </S.Container>
    )
}

export default Question;