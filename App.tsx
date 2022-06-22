import React from 'react';
import Dashboard from './Src/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './Src/Redux/Reducers';
const store = createStore(Reducer);
const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
