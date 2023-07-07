import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react-native'
import type { RenderOptions } from '@testing-library/react-native'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { InitalState, userReducer } from '../../feature/user/userSlicer'
import { ThemeProvider } from 'styled-components/native'
import { lightMode } from '../../theme/lightMode'
import { darkMode } from '../../theme/darkMode'


export const rootReducer = combineReducers({
    user: userReducer
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

export function renderWithProviders(ui: React.ReactElement, { preloadedState = {}, store = configureStore({ reducer: { user: userReducer }, preloadedState }), ...renderOptions }: ExtendedRenderOptions = {}, theme: 'dark' | 'light' = 'light') {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}