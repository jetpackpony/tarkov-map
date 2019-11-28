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
  >
    Some children here
  </Sidebar>
);
