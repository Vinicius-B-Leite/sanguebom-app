import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as S from './styles'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';


type Props = {
    text: string,
    type: 'sucess' | 'error' | 'warning',
    LeftIcon?: () => JSX.Element
}

export type ToastRef = {
    startAnimation: (props: Props) => void
}
const Toast = forwardRef<ToastRef>((props, ref) => {

    const opacityAnimated = useSharedValue(0)
    const [toastConfig, setToastConfig] = useState<Props>({ text: '', type: 'sucess' })

    const startAnimation = ({ text, type, LeftIcon }: Props) => {
        console.log(text);

        setToastConfig({ text, type, LeftIcon })

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
            <S.Container type={toastConfig.type}>
                {
                    toastConfig.LeftIcon && <toastConfig.LeftIcon />
                }
                <S.Label>{toastConfig.text}</S.Label>
            </S.Container>
        </Animated.View >
    )
})

export default Toast;