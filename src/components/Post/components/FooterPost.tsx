import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles'
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


type Props = {
    adress: string,
    createdAt: Date,
    enableMaxLength: boolean,
    description: string
}
const FooterPost: React.FC<Props> = ({ adress, createdAt, enableMaxLength, description }) => {

    const [maxLength, setMathLength] = useState(150)


    return (
        <S.Footer>
            <S.Deatils>
                <S.ComunText>{adress}</S.ComunText>
                <S.ComunText>{
                    formatDistance(
                        new Date(createdAt),
                        new Date(),
                        {
                            locale: ptBR,
                            addSuffix: false
                        })
                }</S.ComunText>
            </S.Deatils>

            <S.Description>
                {
                    enableMaxLength ?
                        description.substring(0, maxLength) :
                        description
                }
                {
                    enableMaxLength && maxLength <= description.length &&
                    <S.ReadMore onPress={() => setMathLength(old => old + 150)}>Ver mais</S.ReadMore>
                }
            </S.Description>
        </S.Footer>
    )
}

export default FooterPost;