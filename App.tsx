import React, { useEffect, useLayoutEffect } from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/feature/store';

import Index from './src';




const App: React.FC = () => {


  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

export default App;