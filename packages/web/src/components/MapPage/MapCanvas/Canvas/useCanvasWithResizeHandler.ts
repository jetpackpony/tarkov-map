import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "preact/compat";
import { getDevicePixelRatio } from "./getDevicePixelRatio";

type CanvasResizeListener = (canvas: HTMLCanvasElement) => void;

export const useCanvasWithResizeHandler = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    w: 100,
    h: 100,
    cssW: "100px",
    cssH: "100px",
  });
  const listeners = useRef<CanvasResizeListener[]>([]);

  const resizeCanvas = useCallback(() => {
    listeners.current.forEach((f) => canvasRef.current && f(canvasRef.current));
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        setCanvasSize({
          w: parent.clientWidth * getDevicePixelRatio(),
          h: parent.clientHeight * getDevicePixelRatio(),
          cssW: `${parent.clientWidth}px`,
          cssH: `${parent.clientHeight}px`,
        });
      }
    }
  }, []);
  const timeoutID = useRef<number | null>(null);
  const resizeCanvasDebounce = useCallback(() => {
    if (timeoutID.current !== null) {
      window.clearTimeout(timeoutID.current);
    }
    timeoutID.current = window.setTimeout(resizeCanvas, 250);
  }, [resizeCanvas]);

  const addResizeListener = (f: CanvasResizeListener) => {
    if (!listeners.current.includes(f)) {
      listeners.current.push(f);
    }
  };

  // Resize canvas after initial load
  useLayoutEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvasDebounce);
    return () => {
      window.removeEventListener("resize", resizeCanvasDebounce);
    };
  }, [resizeCanvasDebounce]);

  return {
    canvasRef,
    canvasSize,
    addResizeListener,
  };
};
