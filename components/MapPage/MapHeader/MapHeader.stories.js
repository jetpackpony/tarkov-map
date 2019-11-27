import { h } from 'preact';
import map from '../../../mapImages/Customs.png';
import MapHeader from './index';
import { action } from '@storybook/addon-actions';

export default {
  title: 'MapHeader',
};

export const header = () => (
  <MapHeader
    currentMap="customs-main"
    onMapSelected={action("map selected")}
  />
);
