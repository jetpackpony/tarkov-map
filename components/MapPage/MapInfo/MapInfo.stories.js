import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import MapInfo from './index';

export default {
  title: 'MapInfo',
};

const extracts = [{
  id: "ext-1",
  names: {
    en: "test-1",
    ru: "тест-1"
  },
  coords: { x: 100, y: 100 }
}, {
  id: "ext-2",
  names: {
    en: "test-2",
    ru: "тест-2"
  },
  coords: { x: 200, y: 200 }
}];

const toggleExtract = action("toggled");

export const emptyExtracts = () => (
  <MapInfo />
);

export const noneSelected = () => (
  <MapInfo
    extracts={extracts}
    selected={[]}
    toggleExtract={toggleExtract}
  />
);

export const withSelected = () => (
  <MapInfo
    extracts={extracts}
    selected={["ext-2"]}
    toggleExtract={toggleExtract}
  />
);
