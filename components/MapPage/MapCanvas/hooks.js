import { useEffect, useLayoutEffect, useState, useRef } from 'preact/compat';

export const useImageLoader = (imgPath) => {
  const [imgObj, setImgObj] = useState(null);
  const onImageLoaded = (e) => {
    setImgObj(e.target);
    console.log("image loaded and set");
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

export const useCanvasWithResizeHandler = (handler) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  const resizeCanvas = () => {
    handler(canvasRef);
    setCanvasSize({
      w: canvasRef.current.width,
      h: canvasRef.current.height
    });
  };

  useLayoutEffect(() => {
    console.log("On component mount useeffect");
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return canvasRef;
};
