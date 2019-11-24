import { h } from 'preact';
import CanvasWrapper from './CanvasWrapper';
import { useRef } from 'preact/compat';
import { useImageLoader } from './hooks';

const draw = (state) => {
  console.log("Drawing", state);
};

const MapCanvas = ({ imgPath, count }) => {
  const imgObj = useImageLoader(imgPath);
  const viewportState = useRef({ scale: 1, count });
  viewportState.current.count = count;

  const onWheel = (e) => {
    viewportState.current.scale -= e.deltaY;
  };
  const redrawCanvas = (canvas, ctx) => {
    draw(viewportState.current);
  };

  return (
    (imgObj)
      ? (
        <CanvasWrapper
          imgPath={imgPath}
          count={count}
          redrawCanvas={redrawCanvas}
          onWheel={onWheel}
        />
      )
      : <div>Loading image...</div>
  );
};

export default MapCanvas;