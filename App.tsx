import React from 'react';

import { Provider } from 'react-redux';
import { store } from './src/feature/store';

import Index from './src';




const App: React.FC = () => {


  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

export default App;