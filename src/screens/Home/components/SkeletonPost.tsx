import React from 'react';
import { View } from 'react-native';
import * as S from './styles'
import SkeletonContainer from '../../../components/SkeletonContainer';
import { useTheme } from 'styled-components/native';

const SkeletonPost: React.FC = () => {

    const theme = useTheme()

    return (
        <S.SkeletonArea>
            <S.SkeletonRow >
                <SkeletonContainer w={theme.vw * 0.1} h={theme.vw * 0.1} isCircle={true} />
                <SkeletonContainer w={theme.vw * 0.7} h={theme.vw * 0.1} />
            </S.SkeletonRow>
            <SkeletonContainer w={theme.vw * 0.8} h={theme.vw * 0.4} />
        </S.SkeletonArea>
    )
}

export default SkeletonPost;