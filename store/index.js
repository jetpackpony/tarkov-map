import { createStore } from 'redux';
import reducer from './reducer';

const makeStore = () => {
  return createStore(reducer);
};

export default makeStore;