import React from 'react';
import * as S from './styles'
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from 'src/feature/store';


type Props = {
    onClick: () => void
}

const AlertButton: React.FC<Props> = ({ onClick }) => {

    const theme = useTheme()
    const userType = useSelector((state: RootState) => state.user.user!.type)

    if (userType !== 'bloodCollectors') return null

    return (
        <S.Container onPress={onClick} >
            <Feather
                testID='alertTriangleIcon'
                name="alert-triangle"
                size={theme.icons.vmd}
                color={theme.type === 'light' ?theme.colors.background_100 : theme.colors.oppositeContrast } />
        </S.Container>
    )
}

export default AlertButton;