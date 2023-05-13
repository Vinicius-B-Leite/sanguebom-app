import React from 'react';
import { View } from 'react-native';
import * as S from './style'
import Skeleton from '../Skeleton';


type Props = {
    w?: number,
    h?: number,
    isCircle?: boolean
}
const SkeletonContainer: React.FC<Props> = ({ h, isCircle, w }) => {
    return (
        <S.Container w={w} h={h} isCircle={isCircle}>
            <Skeleton />
        </S.Container>
    )
}


export default SkeletonContainer;