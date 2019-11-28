import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import Sidebar from './index';

export default {
  title: 'Sidebar',
};

const closeSidebar = action("close");

export const open = () => (
  <Sidebar
    isOpen={true}
    close={closeSidebar}
    headerElement={<div>Marker Color: </div>}
  >
    Some children here
  </Sidebar>
);

export const longList = () => (
  <Sidebar
    isOpen={true}
    close={closeSidebar}
  >
    <div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item 2</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item 3</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item 6</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </div>
  </Sidebar>
);