import { maxScale, panBorder, scaleBorder } from "./constants";

export const clampValue = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const clampScale = (
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

export const clampPos = (
  canvasLen: number,
  imgLen: number,
  scale: number,
  pos: number
) => {
  const imgCanvasLenDiff = canvasLen - imgLen * scale;
  if (imgCanvasLenDiff < panBorder * 2) {
    // If the image does not fit into canvas, make its sides stick to the
    // sides of the canvas
    return clampValue(pos, imgCanvasLenDiff - panBorder, panBorder);
  }
  // If the image does fit into canvas, let it flow freely inside the canvas
  // but not outside of it
  return clampValue(pos, panBorder, imgCanvasLenDiff - panBorder);
};
