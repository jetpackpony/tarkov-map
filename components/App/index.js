import { h } from 'preact';
import MapPage from '../MapPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mapImages from '../../mapImages/*.*';

const initState = {
  imgPath: mapImages.Customs.png,
  markers: [
    { x: 300, y: 500 },
    { x: 400, y: 600 },
  ]
};
const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_MARKER':
      return {
        ...state,
        markers: [
          ...state.markers,
          action.coords
        ]
      };
    default:
      return state;
  }
}
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <MapPage />
    </Provider>
  );
};

export default App;