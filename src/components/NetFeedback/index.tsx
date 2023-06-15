import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as S from './styles'
import { useTheme } from 'styled-components/native';



type Props = {
    isConnected: boolean | null
}
const NetFeedback: React.FC<Props> = ({ isConnected }) => {
    const theme = useTheme()
    const height = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value
        }
    })

    useEffect(() => {
        if (!isConnected) {
            height.value = withTiming(theme.vh * 0.06)
        } else {
            height.value = withTiming(0)
        }
    }, [isConnected])


    return (
        <Animated.View style={animatedStyle}> 
            <S.Container>
                <S.Label>Você está offline. Conecte-se á internet</S.Label>
            </S.Container>
        </Animated.View>
    )
}

export default NetFeedback;