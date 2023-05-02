import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkMode } from './src/theme/darkMode';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/feature/store';
import Routes from './src/routes';
import { setUser } from './src/feature/user/userSlicer';


const App: React.FC = () => {
  

  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={darkMode}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;