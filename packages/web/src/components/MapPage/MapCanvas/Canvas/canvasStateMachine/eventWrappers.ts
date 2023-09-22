import { getDevicePixelRatio } from "../getDevicePixelRatio";
import {
  isPointerEventType,
  PointerEventWrapper,
  WheelEventWrapper,
} from "./types";

export const wrapPointerEvent = (
  e: PointerEvent,
): PointerEventWrapper | null => {
  if (!isPointerEventType(e.type)) {
    return null;
  }
  return {
    type: e.type,
    pointerEvent: {
      pointerId: e.pointerId,
      clientX: e.clientX * getDevicePixelRatio(),
      clientY: e.clientY * getDevicePixelRatio(),
    },
  };
};

export const wrapWheelEvent = (e: WheelEvent): WheelEventWrapper | null => {
  if (e.type !== "wheel") {
    return null;
  }
  return {
    type: e.type,
    wheelEvent: {
      clientX: e.clientX * getDevicePixelRatio(),
      clientY: e.clientY * getDevicePixelRatio(),
      ctrlKey: e.ctrlKey,
      deltaX: e.deltaX * getDevicePixelRatio(),
      deltaY: e.deltaY * getDevicePixelRatio(),
    },
  };
};
