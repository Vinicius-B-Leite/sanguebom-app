import React from 'react';
import { FlatList } from 'react-native';
import * as S from './styles'

type Props = {
    username: string,
    bloodTypes: string[],
    visible: boolean
}

const Alert: React.FC<Props> = ({ username, bloodTypes, visible }) => {

    if (!visible) return <></>

    return (
        <S.AlertInfoContainer>
            <S.Left>
                <S.BloodCollectorName numberOfLines={2}>{username}</S.BloodCollectorName>
            </S.Left>

            <S.Right>
                <FlatList
                    horizontal
                    contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    data={bloodTypes?.map((b, i, a) => i === a.length - 1 ? b : b + ', ')}
                    renderItem={({ item }) => (
                        <S.BloodTypeItem>{item}</S.BloodTypeItem>
                    )}
                />
            </S.Right>
        </S.AlertInfoContainer>
    )
}

export default Alert;