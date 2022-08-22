import { h } from 'preact';
import { Provider } from 'react-redux';
import makeStore from '../../store';
import { getDB } from '../../firebase/index';
import useFullScreen from './useFullScreen';
import { LanguageContext, useInitLanguageContext } from '../../I18nContext';
import App from './App';

const offline = (process.env.OFFLINE === "true") && (process.env.NODE_ENV !== "production");
const db = (offline) ? null : getDB();
const store = makeStore(db);

export default () => {
  useFullScreen();
  const languageContextValue = useInitLanguageContext();
  return (
    <LanguageContext.Provider value={languageContextValue}>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageContext.Provider>
  );
};
