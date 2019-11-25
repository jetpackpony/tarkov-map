import { h } from 'preact';
import map from '../../../mapImages/Customs.png';
import MapCanvas from './index';

export default {
  title: 'MapCanvas',
};

const markers = [
  { x: 300, y: 500 },
  { x: 400, y: 600 },
];
export const withMarkers = () => <MapCanvas imgPath={map} markers={markers} />;
