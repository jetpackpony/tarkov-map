import { useEffect, useState, TargetedEvent } from "preact/compat";

export const useImageLoader = (
  imgPath: string,
  onLoad?: (img: HTMLImageElement) => void
) => {
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const onImageLoaded = (e: Event) => {
      setImgObj((e as TargetedEvent<HTMLImageElement, Event>).currentTarget);
      onLoad &&
        onLoad((e as TargetedEvent<HTMLImageElement, Event>).currentTarget);
    };
    setImgObj(null);
    const img = new Image();
    img.addEventListener("load", onImageLoaded);
    img.src = imgPath;
    return () => img.removeEventListener("load", onImageLoaded);
  }, [imgPath, onLoad]);

  return imgObj;
};
