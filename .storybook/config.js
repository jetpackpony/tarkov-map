import { configure } from '@storybook/preact';

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.stories\.js$/), module);
