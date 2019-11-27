import { h } from 'preact';
import CanvasWrapper from './CanvasWrapper';
import { useRef, useEffect } from 'preact/compat';
import { useImageLoader } from './hooks';

const scaleMulti = 0.01;
const posMulti = 1;

const drawMarker = (ctx, x, y) => {
  ctx.save();
  ctx.strokeStyle = "rgb(214, 19, 51)";
  ctx.lineWidth = 3;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};

const draw = (canvas, ctx, img, { scale, pos }, markers) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.save();
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
    ctx.restore();
    markers.forEach((m) => drawMarker(ctx, m.coords.x * scale, m.coords.y * scale));
  ctx.restore();
};

const getInitViewportState = () => ({
  scale: 1,
  pos: { x: 0, y: 0 },
});

const clampScale = (canvas, img, scale) => {
  const max = 3;
  const min = canvas.width - 50;
  if (img.width * scale < min) {
    return min / img.width;
  }
  if (scale > max) {
    return max;
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

const clampPos = (canvasLen, imgLen, scale, pos) => {
  const max = canvasLen / 2;
  const min = canvasLen / 2 - (imgLen * scale);

  if (pos > max) {
    return max;
  }
  if (pos < min) {
    return min;
  }

  return pos;
};

const maxDist = 20;
const getCloseMarkers = (scale, markers, { x, y }) => (
  markers
    .filter((m) => {
      const dist = ((m.coords.x - x) * (m.coords.x - x) + (m.coords.y - y) * (m.coords.y - y));
      return Math.sqrt(dist) * scale < maxDist;
    })
    .map((m) => m.id)
);

const MapCanvas = ({ imgPath, markers, addMarker, removeMarkers }) => {
  const imgObj = useImageLoader(imgPath);
  const viewportState = useRef(getInitViewportState());
  // Reset vieport state every time the map is changed
  useEffect(() => {
    viewportState.current = getInitViewportState();
  }, [imgPath])

  const onWheel = (canvas, ctx, e) => {
    e.preventDefault();

    // This is scale
    if (e.ctrlKey) {
      let prevScale = viewportState.current.scale;
      viewportState.current.scale -= e.deltaY * scaleMulti;
      viewportState.current.scale = clampScale(canvas, imgObj, viewportState.current.scale);
      viewportState.current.pos = updatePosOnScale(imgObj, viewportState.current.pos, prevScale, viewportState.current.scale, { x: e.offsetX, y: e.offsetY });
    } else {
      // this is moving
      viewportState.current.pos.x -= e.deltaX * posMulti;
      viewportState.current.pos.y -= e.deltaY * posMulti;
      viewportState.current.pos.x = clampPos(canvas.width, imgObj.width, viewportState.current.scale, viewportState.current.pos.x);
      viewportState.current.pos.y = clampPos(canvas.height, imgObj.height, viewportState.current.scale, viewportState.current.pos.y);
    }
  };
  const redrawCanvas = (canvas, ctx) => {
    draw(canvas, ctx, imgObj, viewportState.current, markers);
  };
  const onClick = (canvas, ctx, e) => {
    e.preventDefault();
    const x = Math.round((e.offsetX - viewportState.current.pos.x) / viewportState.current.scale);
    const y = Math.round((e.offsetY - viewportState.current.pos.y) / viewportState.current.scale);
    if (!(x >= 0 && y >= 0 && x <= imgObj.width && y <= imgObj.height)) return;
    if (e.button === 0) {
      addMarker({ x, y });
    }
    if (e.button === 2) {
      const markersToRemove = getCloseMarkers(viewportState.current.scale, markers, { x, y });
      if (markersToRemove.length > 0) {
        removeMarkers(markersToRemove);
      }
    }
  };

  return (
    <div class="map-canvas">
      {
        (imgObj)
          ? (
            <CanvasWrapper
              redrawCanvas={redrawCanvas}
              onWheel={onWheel}
              onClick={onClick}
            />
          )
          : <div>Loading image...</div>
      }
    </div>
  );
};

export default MapCanvas;