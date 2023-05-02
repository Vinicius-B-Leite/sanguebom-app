import React, { useState } from 'react';
import * as S from './styles'
import type { TextInputProps } from 'react-native'
import AntDesign from '@expo/vector-icons//AntDesign';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native'

type Props = {
    leftIcon?: 'user' | 'mail' | 'lock' | 'unlock',
    inputProps: TextInputProps,

}

const Input: React.FC<Props> = ({ leftIcon, inputProps }) => {
    const [isFocused, setIsFocused] = useState(false)
    const theme = useTheme()
    const [secureTextEntry, setsecureTextEntry] = useState(true)

    return (
        <S.Container isFocused={isFocused} hasLeftIcon={!!leftIcon} >
            {
                leftIcon &&
                <TouchableOpacity onPress={() => setsecureTextEntry(!secureTextEntry)}>
                    <AntDesign
                        name={secureTextEntry ? leftIcon : 'unlock'}
                        size={theme.icons.vsm}
                        color={isFocused ? theme.colors.contrast : theme.colors.text}
                    />
                </TouchableOpacity>
            }
            <S.TxtInput
                {...inputProps}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={leftIcon === 'lock' && secureTextEntry}
            />
        </S.Container>
    )
}

export default Input;