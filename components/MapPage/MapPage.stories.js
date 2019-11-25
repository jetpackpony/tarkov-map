import { h } from 'preact';
import map from '../../mapImages/Customs.png';
import { MapPage } from './index';

export default {
  title: 'MapPage',
};

const markers = [
  { x: 300, y: 500 },
  { x: 400, y: 600 },
];
export const page = () => <MapPage imgPath={map} markers={markers} />;
