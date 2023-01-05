import { h } from "preact";
import CanvasWrapper from "./CanvasWrapper";
import { useEffect, useReducer } from "preact/compat";
import { useImageLoader } from "./useImageLoader";
import styles from "./mapCanvas.module.css";
import { draw } from "./drawing";
import { Coords, ExtractMarker, Marker } from "../../../types";
import LoadingSpinner from "../../LoadingSpinner";
import { getCloseMarkers, getViewportCoords } from "./utils";
import { viewportReducer } from "./viewportReducer/viewportReducer";
import { initViewport } from "./viewportReducer/state";
import { makeResetAction } from "./viewportReducer/resetAction";
import { makeZoomAction } from "./viewportReducer/zoomAction";
import { makePanAction } from "./viewportReducer/panAction";
import { useCanvasWithResizeHandler } from "./useCanvasWithResizeHandler";
import { makeClampViewportAction } from "./viewportReducer/clampViewportAction";

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
  const { canvasRef, canvasSize } = useCanvasWithResizeHandler();
  const [viewportState, dispatch] = useReducer(
    viewportReducer,
    null,
    initViewport
  );
  const imgObj = useImageLoader(imgPath);

  const onZoom = (
    canvas: HTMLCanvasElement,
    deltaY: number,
    cursorPos: Coords
  ) => {
    dispatch(makeZoomAction({ canvas, deltaY, imgObj, cursorPos }));
  };
  const onPan = (canvas: HTMLCanvasElement, deltaX: number, deltaY: number) => {
    dispatch(makePanAction({ canvas, imgObj, deltaX, deltaY }));
  };
  const onLeftClick = (coords: Coords) => {
    const clickCoords = getViewportCoords(coords, viewportState);

    // If the click is off the image, ignore
    if (
      !imgObj ||
      !(
        clickCoords.x >= 0 &&
        clickCoords.y >= 0 &&
        clickCoords.x <= imgObj.width &&
        clickCoords.y <= imgObj.height
      )
    ) {
      return;
    }

    const closeMarkers = getCloseMarkers(
      viewportState.scale,
      markers,
      clickCoords
    );

    if (closeMarkers.length > 0) {
      removeMarkers(closeMarkers);
    } else {
      addMarker(clickCoords);
    }
  };

  // Reset vieport state every time the map is changed
  useEffect(() => {
    dispatch(makeResetAction());
  }, [imgPath]);

  useEffect(() => {
    console.log("clamping...");
    canvasRef.current &&
      dispatch(makeClampViewportAction({ imgObj, canvas: canvasRef.current }));
  }, [imgObj, canvasRef.current, canvasSize.w, canvasSize.h]);

  useEffect(() => {
    if (!imgObj || !canvasRef.current) return;
    console.log("drawing", viewportState, markers, imgObj);
    draw(canvasRef.current, imgObj, viewportState, markers);
  }, [viewportState, markers]);

  return (
    <div class={styles.mapCanvas}>
      {imgObj ? (
        <CanvasWrapper
          ref={canvasRef}
          onLeftClick={onLeftClick}
          onPan={onPan}
          onZoom={onZoom}
          isTrackPad={isTrackPad}
          onSwitchToTrackPad={onSwitchToTrackPad}
          canvasSize={canvasSize}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default MapCanvas;
