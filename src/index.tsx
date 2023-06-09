import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './feature/theme/themeSlicer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkMode } from './theme/darkMode';
import { lightMode } from './theme/lightMode';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { RootState } from './feature/store';
import Loading from './screens/Loading';
import { getStorageTheme } from './storage/themeStorage';

// import { Container } from './styles';

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme.isDark)

    const getTheme = async () => {
        const themeStorage = await getStorageTheme()

        if (themeStorage === 'dark'){
            dispatch(changeTheme(true))
            return
        }

        dispatch(changeTheme(false))
    }

    useLayoutEffect(() => {
        getTheme()
    }, [])



    return (
        <QueryClientProvider client={new QueryClient()}>
            <ThemeProvider theme={theme ? darkMode : lightMode}>
                <Routes />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Index;