import { useEffect, useLayoutEffect, useState, useRef } from 'preact/compat';

export const useImageLoader = (imgPath) => {
  const [imgObj, setImgObj] = useState(null);
  const onImageLoaded = (e) => {
    setImgObj(e.target);
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

export const useCanvasWithResizeHandler = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const listeners = useRef([]);

  const resizeCanvas = () => {
    listeners.current.forEach((f) => f(canvasRef, ctxRef));
    setCanvasSize({
      w: canvasRef.current.width,
      h: canvasRef.current.height
    });
  };
  const addResizeListener = (f) => {
    if (!listeners.current.includes(f)) {
      listeners.current.push(f);
    }
  };

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
  });

  useLayoutEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return {
    canvasRef,
    ctxRef,
    addResizeListener
  };
};
