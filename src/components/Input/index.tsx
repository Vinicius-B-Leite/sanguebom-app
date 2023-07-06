import React, { useState } from 'react';
import * as S from './styles'
import type { TextInputProps } from 'react-native'
import AntDesign from '@expo/vector-icons//AntDesign';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native'

type Props = TextInputProps & {
    leftIcon?: 'user' | 'mail' | 'lock' | 'unlock',
    errorMessage?: string | undefined,
    h?: number
}

const Input: React.FC<Props> = ({ leftIcon, errorMessage, h, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false)
    const theme = useTheme()
    const [secureTextEntry, setsecureTextEntry] = useState(true)
    
    return (
        <>
            <S.Container testID='containerView' h={h} isFocused={isFocused} hasLeftIcon={!!leftIcon} >
                {
                    leftIcon &&
                    <TouchableOpacity onPress={() => setsecureTextEntry(!secureTextEntry)}>
                        <AntDesign
                            testID='leftIcon'
                            name={secureTextEntry ? leftIcon : 'unlock'}
                            size={theme.icons.vsm}
                            color={isFocused ? theme.colors.contrast_100 : rest.value ? theme.colors.text_200 : theme.colors.text_100}
                        />
                    </TouchableOpacity>
                }
                <S.TxtInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={leftIcon === 'lock' && secureTextEntry}
                    {...rest}
                />
            </S.Container>
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        </>
    )
}

export default Input;