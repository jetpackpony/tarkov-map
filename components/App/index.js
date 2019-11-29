import { h } from 'preact';
import MapPage from '../MapPage';
import { Provider } from 'react-redux';
import makeStore from '../../store';
import initFirebase from '../../firebase';

const db = initFirebase();
const store = makeStore(db);

const App = () => {
  return (
    <Provider store={store}>
      <MapPage />
    </Provider>
  );
};

export default App;