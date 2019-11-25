import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { MapPage } from './index';

export default {
  title: 'MapPage',
};

const markers = [
  { id: 'dsafasdf', coords: { x: 300, y: 500 } },
  { id: 'wk3jkjk', coords: { x: 400, y: 600 } },
];
const toggleExtract = action("toggled");

export const noExtractsSelected = () => (
  <MapPage
    currentMap='customs-main'
    markers={markers}
    selectedExtracts={[]}
    toggleExtract={toggleExtract}
  />
);

export const withExtractsSelected = () => (
  <MapPage
    currentMap='customs-main'
    markers={markers}
    selectedExtracts={["ext-2"]}
    toggleExtract={toggleExtract}
  />
);
