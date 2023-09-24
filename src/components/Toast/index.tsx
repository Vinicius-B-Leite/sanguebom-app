import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import * as S from './styles'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';


type Props = {
    text: string,
    type: 'sucess' | 'error' | 'warning',
    LeftIcon?: () => JSX.Element
}

export type ToastRef = {
    startAnimation: () => void
}
const Toast = forwardRef<ToastRef, Props>(({ text, type, LeftIcon }, ref) => {

    const opacityAnimated = useSharedValue(0)

    const startAnimation = () => {
        opacityAnimated.value = withSequence(
            withTiming(1, { duration: 1000 }),
            withDelay(1000, withTiming(0, { duration: 1000 }))
        )
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacityAnimated.value,
        };
    });

    useImperativeHandle(ref, () => {
        return {
            startAnimation
        };
    }, []);

    return (
        <Animated.View
            style={[
                { position: 'absolute', zIndex: 2, top: '5%', alignSelf: 'center' },
                animatedStyles
            ]}
        >
            <S.Container type={type}>
                {
                    LeftIcon && <LeftIcon />
                }
                <S.Label>{text}</S.Label>
            </S.Container>
        </Animated.View >
    )
})

export default Toast;