import { h, render } from 'preact';
import App from './components/App';
import './index.css';
import { initI18n } from './i18n';

initI18n();
render(<App />, document.body);