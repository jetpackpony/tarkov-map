import { h } from 'preact';
import MapPage from '../MapPage';
import { Provider } from 'react-redux';
import makeStore from '../../store';
import initFirebase from '../../firebase/index';
import useFullScreen from './useFullScreen';
import { LanguageContext, useInitLanguageContext } from '../../I18nContext';

const offline = (process.env.OFFLINE === "true") && (process.env.NODE_ENV !== "production");
const db = (offline) ? null : initFirebase();
const store = makeStore(db);

const App = () => {
  useFullScreen();
  const languageContextValue = useInitLanguageContext();
  return (
    <LanguageContext.Provider value={languageContextValue}>
      <Provider store={store}>
        <MapPage />
      </Provider>
    </LanguageContext.Provider>
  );
};

export default App;