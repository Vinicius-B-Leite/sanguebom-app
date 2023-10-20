import React, { useState } from 'react';
import * as S from './style'
import { oneboardingAssets } from '../../utlis/oneboardingAssets';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useOneboarding } from '../../context/hooks/useOneboarding';




const Oneboarding: React.FC = () => {
    const { colors, icons } = useTheme()
    const { hideOneboarding } = useOneboarding()
    const [page, setPage] = useState(0)

    const { image, subtitle, title } = oneboardingAssets[page]

    const handleNextPage = () => {

        if ((page + 1) === oneboardingAssets.length) {
            hideOneboarding()
            return
        }
        setPage(old => old + 1)
    }

    const handlePrevPage = () => {
        if (page !== 0) {
            setPage(old => old - 1)
        }
    }

    return (
        <S.Container>
            {
                page > 0 &&
                <S.GoBack onPress={handlePrevPage}>
                    <AntDesign name="arrowleft" size={icons.sm} color={colors.text_100} />
                </S.GoBack>
            }
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
            <S.Image source={image} />

            <S.Bottom>
                <S.IndexWrapper>
                    {
                        oneboardingAssets.map((_, i) =>
                            <S.Index key={i} isSelected={page === i} />
                        )
                    }
                </S.IndexWrapper>
                <S.NextPage onPress={handleNextPage}>
                    <AntDesign name="arrowright" size={icons.vmd} color={'#fff'} />
                </S.NextPage>
            </S.Bottom>
        </S.Container>
    )
}

export default Oneboarding;