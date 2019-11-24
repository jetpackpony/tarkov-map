import { h } from 'preact';
import CanvasWrapper from './CanvasWrapper';

const MapCanvas = ({ imgPath, count }) => {
  return <CanvasWrapper imgPath={imgPath} count={count} />;
};

export default MapCanvas;