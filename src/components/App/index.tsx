import { h } from 'preact';
import MapPage from '../MapPage';
import { Provider } from 'react-redux';
import makeStore from '../../store';
import initFirebase from '../../firebase/index.js';
import useFullScreen from './useFullScreen';

const offline = (process.env.OFFLINE === "true") && (process.env.NODE_ENV !== "production");
const db = (offline) ? null : initFirebase();
const store = makeStore(db);

const App = () => {
  useFullScreen();
  return (
    <Provider store={store}>
      <MapPage />
    </Provider>
  );
};

export default App;