import { h } from 'preact';
import CanvasWrapper from './CanvasWrapper';
import { useRef, useEffect } from 'preact/compat';
import { useImageLoader } from './hooks';
import './mapCanvas.css';

const drawActivationPoint = (ctx, scale, marker) => {
  ctx.save();
  ctx.strokeStyle = "#0E8871";
  ctx.lineWidth = 2;
  ctx.translate(marker.activationCoords.x * scale, marker.activationCoords.y * scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    (marker.coords.x - marker.activationCoords.x) * scale,
    (marker.coords.y - marker.activationCoords.y) * scale
  );
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#0E8871";
  ctx.lineWidth = 3;
  ctx.translate(marker.activationCoords.x * scale, marker.activationCoords.y * scale);
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};

const drawSpecialConditions = (ctx, scale, marker) => {
  const innerScale = 0.04;
  ctx.save();
  ctx.fillStyle = "white";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.translate(marker.coords.x * scale, marker.coords.y * scale);
  ctx.scale(innerScale, innerScale);
  ctx.translate(-180, -250);
  const q = new Path2D('m 33.955001,176.99411 c 7.33,-1.663 14.429,-76.689 110.738999,-98.989 78.27,-18.129 157.672,1.854 157.227,19.08 -0.438,17.227 -139.347,116.667 -174.496,176.083 -28.745,48.592 -11.726,111.07 5.026,120.576 16.751,9.504 24.896,1.307 18.848,-4.455 -6.047,-5.773 -29.844,-39.824 8.489,-86.835 38.333,-47.022 216.049,-134.298 167.463,-229.474 C 290.79,1.5571097 100.522,-3.2668903 36.711001,93.21311 c -31.5490002,47.723 -10.087,85.456 -2.756,83.781 z');
  const p = new Path2D('m 133.103,501.47211 c 19.058,2.031 81.753,-10.787 37.608,-38.207 -28.085,-17.454 -77.01,33.99 -37.608,38.207 z');
  ctx.fill(q);
  ctx.fill(p);
  ctx.restore();
};

const drawExtractionWithActivation = (ctx, scale, marker) => {
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#045C96";
  ctx.lineWidth = 3;
  ctx.translate(marker.coords.x * scale, marker.coords.y * scale);
  ctx.beginPath();
  ctx.arc(0, 0, 15, Math.PI / 2, Math.PI * 3 / 2);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "#0E8871";
  ctx.beginPath();
  ctx.arc(0, 0, 15, Math.PI * 3 / 2, Math.PI / 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};

const drawNormalExtraction = (ctx, scale, marker) => {
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#045C96";
  ctx.lineWidth = 3;
  ctx.translate(marker.coords.x * scale, marker.coords.y * scale);
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};

const drawExtraction = (ctx, scale, marker) => {
  if (marker.activationCoords) {
    drawActivationPoint(ctx, scale, marker);
    drawExtractionWithActivation(ctx, scale, marker);
  } else {
    drawNormalExtraction(ctx, scale, marker);
  }
  if (marker.specialConditions) {
    drawSpecialConditions(ctx, scale, marker);
  }
};

const drawUserMarker = (ctx, scale, marker) => {
  const initScale = 0.08;
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.fillStyle = marker.color;
  ctx.lineWidth = 3;
  ctx.translate(marker.coords.x * scale, marker.coords.y * scale);
  ctx.scale(initScale, initScale);
  ctx.translate(-200, -600);
  const m = new Path2D('M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9   C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8   c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z');
  ctx.fill(m);
  ctx.restore();
};

const drawMarker = (ctx, scale, marker) => {
  switch(marker.type) {
    case "extraction":
      return drawExtraction(ctx, scale, marker);
    case "user":
    default:
      return drawUserMarker(ctx, scale, marker);
  }
};

const draw = (canvas, ctx, img, { scale, pos }, markers) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.save();
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
    ctx.restore();
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    markers.forEach((m) => (
      drawMarker(ctx, scale, m)
    ));
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

const MapCanvas = ({ imgPath, markers, addMarker, removeMarkers }) => {
  const imgObj = useImageLoader(imgPath);
  const viewportState = useRef(getInitViewportState());
  // Reset vieport state every time the map is changed
  useEffect(() => {
    viewportState.current = getInitViewportState();
  }, [imgPath])

  const onZoom = (canvas, deltaY, pos) => {
    let prevScale = viewportState.current.scale;
    viewportState.current.scale -= deltaY;
    viewportState.current.scale = clampScale(canvas, imgObj, viewportState.current.scale);
    viewportState.current.pos = updatePosOnScale(imgObj, viewportState.current.pos, prevScale, viewportState.current.scale, pos);
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

    const closeMarkers = getCloseMarkers(viewportState.current.scale, markers, { x, y });
    if (closeMarkers.length > 0) {
      removeMarkers(
        closeMarkers
          .filter((m) => m.type !== "extraction")
          .map((m) => m.id)
      );
    } else {
      addMarker({ x, y });
    }
  };
  const redrawCanvas = (canvas, ctx) => {
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
            />
          )
          : <div>Loading image...</div>
      }
    </div>
  );
};

export default MapCanvas;