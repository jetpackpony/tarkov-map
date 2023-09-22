import { Ref, useEffect, useRef } from "preact/compat";
import { ExtractMarker, Marker } from "../../../../types";
import { ViewportState } from "./canvasStateMachine/viewport";
import { draw } from "./drawing";

export const useDrawCanvasDebounced = (
  viewportState: ViewportState,
  markers: (Marker | ExtractMarker)[],
  canvasRef: Ref<HTMLCanvasElement>,
  imgObj: HTMLImageElement,
) => {
  const drawing = useRef(false);
  const drawFunction = useRef<() => void>(() => null);
  useEffect(() => {
    // This stores the most recent values for drawing canvas by closing over them
    drawFunction.current = () => {
      if (!imgObj || !canvasRef.current) return;
      draw(canvasRef.current, imgObj, viewportState, markers);
    };
    // The actual drawing happens only if the previous drawing call finished
    // This debounces canvas updates to the screen refresh rate
    if (!drawing.current) {
      drawing.current = true;
      requestAnimationFrame(() => {
        drawFunction.current();
        drawing.current = false;
      });
    }
  }, [viewportState, markers, canvasRef, imgObj]);
};
