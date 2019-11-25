import { h } from 'preact';
import MapPage from '../MapPage';
import { Provider } from 'react-redux';
import makeStore from '../../store';

const store = makeStore();

const App = () => {
  return (
    <Provider store={store}>
      <MapPage />
    </Provider>
  );
};

export default App;