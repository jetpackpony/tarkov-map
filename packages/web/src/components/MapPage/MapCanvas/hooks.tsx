import { Ref } from 'preact';
import { useEffect, useLayoutEffect, useState, useRef, TargetedEvent } from 'preact/compat';

export const useImageLoader = (imgPath: string, onLoad: (img: HTMLImageElement) => void) => {
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const onImageLoaded = (e: Event) => {
    setImgObj((e as TargetedEvent<HTMLImageElement, Event>).currentTarget);
    onLoad((e as TargetedEvent<HTMLImageElement, Event>).currentTarget);
  };
  useEffect(() => {
    if (imgObj) setImgObj(null);
    const img = new Image();
    img.addEventListener("load", onImageLoaded);
    img.src = imgPath;
    return () => img.removeEventListener("load", onImageLoaded);
  }, [imgPath]);

  return imgObj;
};

type CanvasResizeListener = (canvas: HTMLCanvasElement) => any;

export const useCanvasWithResizeHandler = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [_, setCanvasSize] = useState({ w: 0, h: 0 });
  const listeners = useRef<CanvasResizeListener[]>([]);

  const resizeCanvas = () => {
    listeners.current.forEach((f) => canvasRef.current && f(canvasRef.current));
    if (canvasRef.current) {
      setCanvasSize({
        w: canvasRef.current.width,
        h: canvasRef.current.height
      });
    }
  };
  const addResizeListener = (f: CanvasResizeListener) => {
    if (!listeners.current.includes(f)) {
      listeners.current.push(f);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return {
    canvasRef,
    addResizeListener
  };
};
