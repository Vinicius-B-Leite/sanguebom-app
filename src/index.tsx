import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './feature/theme/themeSlicer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkMode } from './theme/darkMode';
import { lightMode } from './theme/lightMode';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { RootState } from './feature/store';
import { getStorageTheme } from './storage/themeStorage';


const Index: React.FC = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme.isDark)

    const getTheme =  () => {
        const themeStorage =  getStorageTheme()

        if (!themeStorage || themeStorage === 'light' ){
            dispatch(changeTheme(false))
            return
        }

        dispatch(changeTheme(true))
    }

    useEffect(() => {
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