import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkMode } from './src/theme/darkMode';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/feature/store';
import Routes from './src/routes';
import { setUser } from './src/feature/user/userSlicer';
import { lightMode } from './src/theme/lightMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeTheme } from './src/feature/theme/themeSlicer';
import Index from './src';


const App: React.FC = () => {


  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

export default App;