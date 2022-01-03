import { h } from 'preact';
import CanvasWrapper from './CanvasWrapper';
import { useRef, useEffect } from 'preact/compat';
import { useImageLoader } from './hooks';
import './mapCanvas.css';
import { draw } from './drawing';

const maxScale = 3;
const scaleBorder = 50;
const panBorder = 30;

const getInitViewportState = () => ({
  scale: 1,
  pos: { x: 0, y: 0 },
});

const clampScale = (canvas, img, scale) => {
  const minWScale = (canvas.width - scaleBorder) / img.width;
  const minHScale = (canvas.height - scaleBorder) / img.height;
  const min = Math.min(minWScale, minHScale);
  if (scale < min) {
    return min;
  }
  if (scale > maxScale) {
    return maxScale;
  }
  return scale;
};

const updatePosOnScale = (img, pos, prevScale, scale, cursorPos) => {
  let wp = (cursorPos.x - pos.x) / (img.width * prevScale);
  let hp = (cursorPos.y - pos.y) / (img.height * prevScale);
  return {
    x: cursorPos.x - (img.width * scale) * wp,
    y: cursorPos.y - (img.height * scale) * hp
  };
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const clampPos = (canvasLen, imgLen, scale, pos) => {
  const imgCanvasLenDiff = canvasLen - imgLen * scale;
  if (imgCanvasLenDiff < panBorder * 2) {
    // If the image does not fit into canvas, make its sides stick to the
    // sides of the canvas
    return clamp(pos, imgCanvasLenDiff - panBorder, panBorder);
  } else {
    // If the image does fit into canvas, let it flow freely inside the canvas
    // but not outside of it
    return clamp(pos, panBorder, imgCanvasLenDiff - panBorder);
  }
};

const maxX = 20;
const maxY = 30;
const getCloseMarkers = (scale, markers, { x, y }) => {
  return markers
    .filter((m) => {
      const distX = Math.abs(m.coords.x - x);
      const distY = Math.abs(m.coords.y - y - 25 / scale);
      return (distX * scale < maxX && distY * scale < maxY);
    });
};

const MapCanvas = ({
  imgPath,
  markers,
  addMarker,
  removeMarkers,
  isTrackPad,
  onSwitchToTrackPad
}) => {
  const viewportState = useRef(getInitViewportState());
  const onImageLoaded = (img) => {
    viewportState.current.scale = 0.01;
  };
  const imgObj = useImageLoader(imgPath, onImageLoaded);
  // Reset vieport state every time the map is changed
  useEffect(() => {
    viewportState.current = getInitViewportState();
  }, [imgPath])

  const onZoom = (canvas, deltaY, pos) => {
    let prevScale = viewportState.current.scale;
    viewportState.current.scale -= deltaY;
    viewportState.current.scale = clampScale(canvas, imgObj, viewportState.current.scale);
    viewportState.current.pos = updatePosOnScale(imgObj, viewportState.current.pos, prevScale, viewportState.current.scale, pos);
    viewportState.current.pos.x = clampPos(canvas.width, imgObj.width, viewportState.current.scale, viewportState.current.pos.x);
    viewportState.current.pos.y = clampPos(canvas.height, imgObj.height, viewportState.current.scale, viewportState.current.pos.y);
  };
  const onPan = (canvas, deltaX, deltaY) => {
    viewportState.current.pos.x -= deltaX;
    viewportState.current.pos.y -= deltaY;
    viewportState.current.pos.x = clampPos(canvas.width, imgObj.width, viewportState.current.scale, viewportState.current.pos.x);
    viewportState.current.pos.y = clampPos(canvas.height, imgObj.height, viewportState.current.scale, viewportState.current.pos.y);
  };
  const onLeftClick = (canvasX, canvasY) => {
    // Calculate coords on an image
    const x = Math.round((canvasX - viewportState.current.pos.x) / viewportState.current.scale);
    const y = Math.round((canvasY - viewportState.current.pos.y) / viewportState.current.scale);

    // If the click is off the image, ignore
    if (!(x >= 0 && y >= 0 && x <= imgObj.width && y <= imgObj.height)) return;

    const closeMarkers =
      getCloseMarkers(viewportState.current.scale, markers, { x, y })
        .filter((m) => m.type !== "extraction")
        .map((m) => m.id);
    if (closeMarkers.length > 0) {
      removeMarkers(closeMarkers);
    } else {
      addMarker({ x, y });
    }
  };
  const redrawCanvas = (canvas, ctx) => {
    viewportState.current.scale = clampScale(canvas, imgObj, viewportState.current.scale);
    viewportState.current.pos.x = clampPos(canvas.width, imgObj.width, viewportState.current.scale, viewportState.current.pos.x);
    viewportState.current.pos.y = clampPos(canvas.height, imgObj.height, viewportState.current.scale, viewportState.current.pos.y);
    draw(canvas, ctx, imgObj, viewportState.current, markers);
  };

  return (
    <div class="map-canvas">
      {
        (imgObj)
          ? (
            <CanvasWrapper
              redrawCanvas={redrawCanvas}
              onLeftClick={onLeftClick}
              onPan={onPan}
              onZoom={onZoom}
              isTrackPad={isTrackPad}
              onSwitchToTrackPad={onSwitchToTrackPad}
            />
          )
          : <div>Loading image...</div>
      }
    </div>
  );
};

export default MapCanvas;