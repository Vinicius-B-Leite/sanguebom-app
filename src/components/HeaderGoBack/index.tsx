import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './styles'
import { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';


type Props = {
    goBack: () => void,
    theme: 'transparent' | 'contrast',
    title?: string
}

const HeaderGoBack: React.FC<Props> = ({ goBack, theme, title }) => {
    const { colors, icons, type } = useTheme()

    return (
        <S.Header themeBg={theme}>
            <TouchableOpacity onPress={goBack}>
                <AntDesign
                    name="left"
                    size={icons.sm}
                    color={theme === 'transparent' ? colors.contrast_100 : colors.oppositeContrast} />
            </TouchableOpacity>
            {
                title && <S.Title>{title}</S.Title>
            }
        </S.Header>
    )
}

export default HeaderGoBack;