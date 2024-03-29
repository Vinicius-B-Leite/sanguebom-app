import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react-native'
import type { RenderOptions } from '@testing-library/react-native'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { userReducer } from '../../feature/user/userSlicer'
import { notificationReducer } from '../../feature/notification/notificationSlice'
import { themeReducer } from '../../feature/theme/themeSlicer'

import { ThemeProvider } from 'styled-components/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'

import { lightMode } from '../../theme/lightMode'
import { darkMode } from '../../theme/darkMode'


const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    theme: themeReducer
})


export function setupStore(preloadedState?: PreloadedState<ReturnType<typeof rootReducer>>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<ReturnType<typeof rootReducer>>
    store?: ReturnType<typeof setupStore>
}

export function renderWithProviders(ui: React.ReactElement, { preloadedState = {}, store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions }: ExtendedRenderOptions = {}, theme: 'dark' | 'light' = 'light') {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    cacheTime: Infinity,
                    retry: false
                },
            },
             logger:  {
                log: console.log,
                warn: console.warn,
                // ✅ no more errors on the console for tests
                error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
              },
        })


        return (
            <QueryClientProvider client={client}>
                <Provider store={store}>
                    <ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
                        <NavigationContainer>
                            {children}
                        </NavigationContainer>
                    </ThemeProvider>
                </Provider>
            </QueryClientProvider>
        )
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react-native'
