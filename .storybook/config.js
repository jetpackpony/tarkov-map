import { configure } from '@storybook/preact';
import '../index.css';

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.stories\.js$/), module);
