import { h } from 'preact';
import MapPage from '../MapPage';
import { useAppDispatch } from '../../store';
import useFullScreen from './useFullScreen';
import Router, { route } from 'preact-router';
import { loadSession } from '../../store/uiSlice';

const buildQueryParams = (...params: (Record<string, string | undefined> | null)[]): string => {
  const args = params.reduce((acc, obj) => {
    if (obj) {
      acc = {
        ...acc,
        ...obj
      };
    }
    return acc;
  });
  return Object.entries(args).reduce((acc, [key, value]) => (
    acc + `${key}=${(value !== undefined) ? value : ""}&`
  ), "");
};

const App = () => {
  const dispatch = useAppDispatch();
  useFullScreen();
  return (
    <Router onChange={(args) => {
      if (args.path === "/map") {
        dispatch(loadSession(args.matches?.sessionId))
          .unwrap()
          .then(({ session }) => {
            if (args.matches?.sessionId !== session.id) {
              route(args.path + "?" + buildQueryParams(args.matches, { sessionId: session.id }))
            }
          })
          .catch((err) => {
            if (err?.name !== 'ConditionError') {
              console.error("Error loading session: ", err);
            }
          });
      }
    }}>
      <MapPage path="/map" />
    </Router>
  );
};

export default App;