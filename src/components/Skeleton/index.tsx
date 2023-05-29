import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';


const { width } = Dimensions.get('screen')



const Skeleton: React.FC = () => {

    const transformX = useSharedValue(-(width))
    const [widthComponent, setWidthComponent] = useState<number | undefined>()
    const theme = useTheme()
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: transformX.value
                }
            ]
        }
    })

    useEffect(() => {
        if (widthComponent) {
            transformX.value = withRepeat(withTiming(widthComponent + (width * 0.01), { duration: 1500 }), -10, false)
        }
    }, [widthComponent])

    return (
        <Animated.View
            onLayout={({ nativeEvent }) => setWidthComponent(nativeEvent.layout.width)}
            style={[animatedStyle, { flex: 1, flexDirection: 'row' }]}>
            <LinearGradient
                colors={[theme.type === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{ flex: 1 }}
            />
            <LinearGradient
                colors={[theme.type === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            />
        </Animated.View>
    )
}

export default Skeleton;