import React from 'react';
import { HospitalType } from '../../../types/HospitalType';
import * as S from './style'
import { baseURL } from '../../../api';


type Props = {
    bloodCollector: HospitalType
}

const BloodCollectorItem: React.FC<Props> = ({ bloodCollector }) => {
    return (
        <S.Container testID={bloodCollector.username}>
            <S.Avatar source={{ uri: baseURL + bloodCollector.imageURL }} />
            <S.BloodCollectorName numberOfLines={1}>{bloodCollector.username}</S.BloodCollectorName>
        </S.Container>
    )
}

export default BloodCollectorItem;