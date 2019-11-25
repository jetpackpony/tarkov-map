import { h } from 'preact';
import { MapPage } from './index';

export default {
  title: 'MapPage',
};

const markers = [
  { id: 'dsafasdf', coords: { x: 300, y: 500 } },
  { id: 'wk3jkjk', coords: { x: 400, y: 600 } },
];
export const page = () => (
  <MapPage
    currentMap={['customs', 'keys']}
    markers={markers}
  />
);
