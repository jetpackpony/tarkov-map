import { assign } from "xstate";
import { send, pure } from "xstate/lib/actions";
import { Coords, Dimentions, ExtractMarker, Marker } from "../../../../types";
import { distance, getCloseMarkers, getMiddleCoords } from "../utils";
import {
  initViewport,
  panViewport,
  ViewportState,
  zoomViewport,
} from "../viewport";
import {
  MIN_DRAG_DIST,
  MOUSEWHEEL_SCALE_MULTIPLIER,
  PINCH_SCALE_MULTIPLIER,
  TRACKPAD_SCALE_MULTIPLIER,
} from "../viewport/constants";
import { getImageCoords } from "../viewport/utils";
import {
  CanvasMachineContext,
  PointerData,
  PointerEventWrapper,
  PointerMoveEvent,
  RemovePoinerEvent,
  ResetCanvasEvent,
  WheelEventWrapper,
} from "./types";

export const initContext = (
  canvasSize?: Dimentions,
  imgSize?: Dimentions,
  viewportState?: ViewportState
): CanvasMachineContext => {
  return {
    activePointers: new Map<number, PointerData>(),
    pointerDistance: 0,
    isTrackPad: false,
    viewportState: initViewport(canvasSize, imgSize, viewportState),
  };
};

export const pointerDown = pure<CanvasMachineContext, PointerEventWrapper>(
  (ctx: CanvasMachineContext, event: PointerEventWrapper) => {
    ctx.activePointers.set(event.pointerEvent.pointerId, {
      initialPos: {
        x: event.pointerEvent.clientX,
        y: event.pointerEvent.clientY,
      },
      prevPos: {
        x: event.pointerEvent.clientX,
        y: event.pointerEvent.clientY,
      },
      event: event.pointerEvent,
    });
    if (ctx.activePointers.size > 1) {
      const pointers = Array.from(ctx.activePointers.values());
      ctx.pointerDistance = distance(pointers[0].prevPos, pointers[1].prevPos);
    }
    return send({
      type: "ADD_POINTER",
      payload: { pointerId: event.pointerEvent.pointerId },
    });
  }
);

export const pointerUp = pure<CanvasMachineContext, PointerEventWrapper>(
  (ctx: CanvasMachineContext, event: PointerEventWrapper) => {
    ctx.activePointers.delete(event.pointerEvent.pointerId);
    return send({
      type: "REMOVE_POINTER",
      payload: {
        coords: {
          x: event.pointerEvent.clientX,
          y: event.pointerEvent.clientY,
        },
      },
    });
  }
);

export const pointerLeave = pure<CanvasMachineContext, PointerEventWrapper>(
  (ctx: CanvasMachineContext, event: PointerEventWrapper) => {
    ctx.activePointers.delete(event.pointerEvent.pointerId);
    return send({
      type: "LEAVE_POINTER",
      payload: { pointerId: event.pointerEvent.pointerId },
    });
  }
);

export const pointerMove = pure<CanvasMachineContext, PointerEventWrapper>(
  (ctx: CanvasMachineContext, event: PointerEventWrapper) => {
    const pointer = ctx.activePointers.get(event.pointerEvent.pointerId);
    if (!pointer) {
      return;
    }
    const { clientX, clientY } = event.pointerEvent;
    const deltaX = pointer.prevPos.x - clientX;
    const deltaY = pointer.prevPos.y - clientY;
    pointer.prevPos = { x: clientX, y: clientY };
    return send({
      type: "POINTER_MOVE",
      payload: {
        deltaX,
        deltaY,
        pointerId: event.pointerEvent.pointerId,
      },
    });
  }
);

export const resetCanvas = assign(
  (ctx: CanvasMachineContext, event: ResetCanvasEvent) => {
    const { canvasSize, imgSize } = event.payload;
    return initContext(canvasSize, imgSize, ctx.viewportState);
  }
);

export const panWithPointer = (
  ctx: CanvasMachineContext,
  event: PointerMoveEvent
) => {
  const { deltaX, deltaY } = event.payload;
  ctx.viewportState = panViewport(ctx.viewportState, deltaX, deltaY);
};

export const panWithTrackpad = (
  ctx: CanvasMachineContext,
  event: WheelEventWrapper
) => {
  const { deltaX, deltaY } = event.wheelEvent;
  ctx.viewportState = panViewport(ctx.viewportState, deltaX, deltaY);
};

export const zoomWithTrackpad = (
  ctx: CanvasMachineContext,
  event: WheelEventWrapper
) => {
  const { clientX, clientY, deltaY } = event.wheelEvent;
  const delta = deltaY * TRACKPAD_SCALE_MULTIPLIER;
  ctx.viewportState = zoomViewport(
    ctx.viewportState,
    {
      x: clientX,
      y: clientY,
    },
    delta
  );
};

export const zoomWithWheel = (
  ctx: CanvasMachineContext,
  event: WheelEventWrapper
) => {
  if (!ctx.isTrackPad) {
    const { clientX, clientY, deltaY } = event.wheelEvent;
    const delta = (deltaY / Math.abs(deltaY)) * MOUSEWHEEL_SCALE_MULTIPLIER;
    ctx.viewportState = zoomViewport(
      ctx.viewportState,
      {
        x: clientX,
        y: clientY,
      },
      delta
    );
  }
};

export const zoomWithPinch = (ctx: CanvasMachineContext) => {
  const pointers = Array.from(ctx.activePointers.values());
  const pointer0 = pointers[0].prevPos;
  const pointer1 = pointers[1].prevPos;
  const newDistance = distance(pointer0, pointer1);
  const delta = (ctx.pointerDistance - newDistance) * PINCH_SCALE_MULTIPLIER;
  const middle = getMiddleCoords(pointer0, pointer1);
  ctx.viewportState = zoomViewport(
    ctx.viewportState,
    {
      x: middle.x,
      y: middle.y,
    },
    delta
  );
  ctx.pointerDistance = newDistance;
};

export const hasMovedFromInitialPoint = (
  ctx: CanvasMachineContext,
  event: PointerMoveEvent
) => {
  const pointer = ctx.activePointers.get(event.payload.pointerId);
  if (!pointer) return false;
  const dist = distance(pointer.initialPos, {
    x: pointer.prevPos.x,
    y: pointer.prevPos.y,
  });
  return dist >= MIN_DRAG_DIST;
};

export const isTrackpadZooming = (
  ctx: CanvasMachineContext,
  event: WheelEventWrapper
) => {
  if (event.wheelEvent.deltaX !== 0) {
    ctx.isTrackPad = true;
  }
  if (event.wheelEvent.ctrlKey) {
    ctx.isTrackPad = true;
    return true;
  }
  return false;
};

export const isTrackpadPannig = (
  ctx: CanvasMachineContext,
  event: WheelEventWrapper
) => {
  if (ctx.isTrackPad || event.wheelEvent.deltaX !== 0) {
    ctx.isTrackPad = true;
    return true;
  }
  return false;
};

export const makeLeftClickAction = (
  addMarker: (coords: Coords) => void,
  removeMarkers: (ids: string[]) => void,
  markers: (Marker | ExtractMarker)[]
) => {
  return (ctx: CanvasMachineContext, event: RemovePoinerEvent) => {
    const viewportCoords = event.payload.coords;
    const imageCoords = getImageCoords(viewportCoords, ctx.viewportState);
    if (imageCoords) {
      const closeMarkers = getCloseMarkers(
        ctx.viewportState.scale,
        markers,
        imageCoords
      );
      if (closeMarkers.length > 0) {
        removeMarkers(closeMarkers);
      } else {
        addMarker(imageCoords);
      }
    }
  };
};
