import { Coords, Dimentions } from "../../../../../types";
import { ViewportState } from "./viewport";

export interface PointerData {
  prevPos: Coords;
  initialPos: Coords;
  event: PointerEvent;
}

export interface CanvasMachineContext {
  activePointers: Map<number, PointerData>;
  pointerDistance: number;
  isTrackPad: boolean;
  viewportState: ViewportState;
}

export enum PointerEvents {
  "pointerdown" = "pointerdown",
  "pointerup" = "pointerup",
  "pointermove" = "pointermove",
  "pointerleave" = "pointerleave",
}
export interface PointerEvent {
  pointerId: number;
  clientX: number;
  clientY: number;
}
export type PointerEventType = keyof typeof PointerEvents;
export const isPointerEventType = (type: string): type is PointerEventType => {
  return type in PointerEvents;
};
export interface PointerEventWrapper {
  type: PointerEventType;
  pointerEvent: PointerEvent;
}
export interface WheelEvent {
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  deltaX: number;
  deltaY: number;
}
export interface WheelEventWrapper {
  type: "wheel";
  wheelEvent: WheelEvent;
}
export interface ResetCanvasEvent {
  type: "RESET_CANVAS";
  payload: {
    canvasSize: Dimentions;
    imgSize: Dimentions;
  };
}
export interface AddPoinerEvent {
  type: "ADD_POINTER";
  payload: {
    pointerId: PointerEvent["pointerId"];
  };
}
export interface RemovePoinerEvent {
  type: "REMOVE_POINTER";
  payload: {
    coords: Coords;
  };
}
export interface PointerMoveEvent {
  type: "POINTER_MOVE";
  payload: {
    pointerId: PointerEvent["pointerId"];
    deltaX: number;
    deltaY: number;
  };
}
export interface LeavePoinerEvent {
  type: "LEAVE_POINTER";
  payload: {
    pointerId: PointerEvent["pointerId"];
  };
}
export type CanvasMachineEvent =
  | PointerEventWrapper
  | WheelEventWrapper
  | ResetCanvasEvent
  | AddPoinerEvent
  | RemovePoinerEvent
  | LeavePoinerEvent
  | PointerMoveEvent;
