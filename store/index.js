import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger'

const makeStore = () => {
  return createStore(
    reducer,
    applyMiddleware(
      createLogger() // needs to be at the end of the list
    )
  );
};

export default makeStore;