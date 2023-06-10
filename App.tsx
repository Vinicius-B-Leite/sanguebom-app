import React, { useEffect, useLayoutEffect } from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/feature/store';

import Index from './src';
import OneSignal from 'react-native-onesignal';



OneSignal.setAppId('6df54534-d625-4068-a0bb-efa0e5917998')
const App: React.FC = () => {


  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

export default App;