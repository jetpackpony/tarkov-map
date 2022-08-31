import { h } from "preact";
import CanvasWrapper from "./CanvasWrapper";
import { useRef, useEffect } from "preact/compat";
import { useImageLoader } from "./hooks";
import styles from "./mapCanvas.module.css";
import { draw } from "./drawing";
import { Coords, ExtractMarker, Marker } from "../../../types";
import LoadingSpinner from "../../LoadingSpinner";

const maxScale = 3;
const scaleBorder = 50;
const panBorder = 30;

const getInitViewportState = () => ({
  scale: 0.01,
  pos: { x: 0, y: 0 },
});

const clampScale = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  scale: number
) => {
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

const updatePosOnScale = (
  img: HTMLImageElement,
  pos: Coords,
  prevScale: number,
  scale: number,
  cursorPos: Coords
) => {
  const wp = (cursorPos.x - pos.x) / (img.width * prevScale);
  const hp = (cursorPos.y - pos.y) / (img.height * prevScale);
  return {
    x: cursorPos.x - img.width * scale * wp,
    y: cursorPos.y - img.height * scale * hp,
  };
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const clampPos = (
  canvasLen: number,
  imgLen: number,
  scale: number,
  pos: number
) => {
  const imgCanvasLenDiff = canvasLen - imgLen * scale;
  if (imgCanvasLenDiff < panBorder * 2) {
    // If the image does not fit into canvas, make its sides stick to the
    // sides of the canvas
    return clamp(pos, imgCanvasLenDiff - panBorder, panBorder);
  }
  // If the image does fit into canvas, let it flow freely inside the canvas
  // but not outside of it
  return clamp(pos, panBorder, imgCanvasLenDiff - panBorder);
};

const maxX = 20;
const maxY = 30;
const getCloseMarkers = (
  scale: number,
  markers: (Marker | ExtractMarker)[],
  { x, y }: Coords
) => {
  return markers.filter((m) => {
    const distX = Math.abs(m.coords.x - x);
    const distY = Math.abs(m.coords.y - y - 25 / scale);
    return distX * scale < maxX && distY * scale < maxY;
  });
};

interface MapCanvasProps {
  imgPath: string;
  markers: (Marker | ExtractMarker)[];
  isTrackPad: boolean;
  addMarker: (coords: Coords) => void;
  removeMarkers: (ids: string[]) => void;
  onSwitchToTrackPad: (payload: { isTrackPad: boolean }) => void;
}

const MapCanvas = ({
  imgPath,
  markers,
  isTrackPad,
  addMarker,
  removeMarkers,
  onSwitchToTrackPad,
}: MapCanvasProps) => {
  const viewportState = useRef(getInitViewportState());
  const imgObj = useImageLoader(imgPath);
  // Reset vieport state every time the map is changed
  useEffect(() => {
    viewportState.current = getInitViewportState();
  }, [imgPath]);

  const onZoom = (canvas: HTMLCanvasElement, deltaY: number, pos: Coords) => {
    if (!imgObj) return;
    const prevScale = viewportState.current.scale;
    viewportState.current.scale -= deltaY;
    viewportState.current.scale = clampScale(
      canvas,
      imgObj,
      viewportState.current.scale
    );
    viewportState.current.pos = updatePosOnScale(
      imgObj,
      viewportState.current.pos,
      prevScale,
      viewportState.current.scale,
      pos
    );
    viewportState.current.pos.x = clampPos(
      canvas.width,
      imgObj.width,
      viewportState.current.scale,
      viewportState.current.pos.x
    );
    viewportState.current.pos.y = clampPos(
      canvas.height,
      imgObj.height,
      viewportState.current.scale,
      viewportState.current.pos.y
    );
  };
  const onPan = (canvas: HTMLCanvasElement, deltaX: number, deltaY: number) => {
    if (!imgObj) return;
    viewportState.current.pos.x -= deltaX;
    viewportState.current.pos.y -= deltaY;
    viewportState.current.pos.x = clampPos(
      canvas.width,
      imgObj.width,
      viewportState.current.scale,
      viewportState.current.pos.x
    );
    viewportState.current.pos.y = clampPos(
      canvas.height,
      imgObj.height,
      viewportState.current.scale,
      viewportState.current.pos.y
    );
  };
  const onLeftClick = (canvasX: number, canvasY: number) => {
    // Calculate coords on an image
    const x = Math.round(
      (canvasX - viewportState.current.pos.x) / viewportState.current.scale
    );
    const y = Math.round(
      (canvasY - viewportState.current.pos.y) / viewportState.current.scale
    );

    // If the click is off the image, ignore
    if (
      !imgObj ||
      !(x >= 0 && y >= 0 && x <= imgObj.width && y <= imgObj.height)
    )
      return;

    const closeMarkers = getCloseMarkers(viewportState.current.scale, markers, {
      x,
      y,
    })
      .filter((m) => m.type !== "extraction")
      .map((m) => m.id);
    if (closeMarkers.length > 0) {
      removeMarkers(closeMarkers);
    } else {
      addMarker({ x, y });
    }
  };
  const redrawCanvas = (canvas: HTMLCanvasElement) => {
    if (!imgObj) return;
    viewportState.current.scale = clampScale(
      canvas,
      imgObj,
      viewportState.current.scale
    );
    viewportState.current.pos.x = clampPos(
      canvas.width,
      imgObj.width,
      viewportState.current.scale,
      viewportState.current.pos.x
    );
    viewportState.current.pos.y = clampPos(
      canvas.height,
      imgObj.height,
      viewportState.current.scale,
      viewportState.current.pos.y
    );
    draw(canvas, imgObj, viewportState.current, markers);
  };

  return (
    <div class={styles.mapCanvas}>
      {imgObj ? (
        <CanvasWrapper
          redrawCanvas={redrawCanvas}
          onLeftClick={onLeftClick}
          onPan={onPan}
          onZoom={onZoom}
          isTrackPad={isTrackPad}
          onSwitchToTrackPad={onSwitchToTrackPad}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default MapCanvas;
