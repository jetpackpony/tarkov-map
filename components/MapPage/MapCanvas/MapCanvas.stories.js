import { h } from 'preact';
import map from '../../../mapImages/Customs.png';
import MapCanvas from './index';

export default {
  title: 'MapCanvas',
};

const markers = [
  { id: 'dsafasdf', coords: { x: 100, y: 100 } },
  { id: 'wk3jkjk', coords: { x: 200, y: 200 } },
];
export const withMarkers = () => (
  <div style={{ height: "500px" }}>
    <MapCanvas imgPath={map} markers={markers} />
  </div>
);
