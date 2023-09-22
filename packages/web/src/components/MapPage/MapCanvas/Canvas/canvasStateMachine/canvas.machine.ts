import { createMachine } from "xstate";
import { CanvasMachineContext, CanvasMachineEvent } from "./types";
import {
  hasMovedFromInitialPoint,
  initContext,
  isTrackpadPannig,
  isTrackpadZooming,
  canvasMachineActions,
} from "./actions";

export const selectViewport = (state: typeof canvasMachine) =>
  state.context.viewportState;

export const canvasMachine = createMachine(
  {
    schema: {
      context: {} as CanvasMachineContext,
      events: {} as CanvasMachineEvent,
    },
    tsTypes: {} as import("./canvas.machine.typegen").Typegen0,
    id: "canvas",
    predictableActionArguments: true,
    initial: "idle",
    context: initContext(),
    on: {
      RESET_CANVAS: {
        target: ".idle",
        actions: "resetCanvas",
      },
      wheel: [
        {
          actions: "zoomWithTrackpad",
          cond: "isTrackpadZooming",
        },
        {
          actions: "panWithTrackpad",
          cond: "isTrackpadPannig",
        },
        {
          actions: "zoomWithWheel",
        },
      ],
      pointerdown: {
        actions: "pointerDown",
      },
      pointerup: {
        actions: "pointerUp",
      },
      pointerleave: {
        actions: "pointerLeave",
      },
      pointermove: {
        actions: "pointerMove",
      },
    },
    states: {
      idle: {
        on: {
          ADD_POINTER: {
            target: "pointerDown",
          },
        },
      },
      pointerDown: {
        on: {
          POINTER_MOVE: {
            target: "pointerPanning",
            actions: "panWithPointer",
            cond: "hasMovedFromInitialPoint",
          },
          ADD_POINTER: { target: "pinchZooming" },
          REMOVE_POINTER: { target: "idle", actions: "leftClick" },
          LEAVE_POINTER: { target: "idle" },
        },
      },
      pointerPanning: {
        on: {
          POINTER_MOVE: [
            { target: "pointerPanning", actions: "panWithPointer" },
          ],
          ADD_POINTER: { target: "pinchZooming" },
          REMOVE_POINTER: { target: "idle" },
          LEAVE_POINTER: { target: "idle" },
        },
      },
      pinchZooming: {
        on: {
          POINTER_MOVE: [{ target: "pinchZooming", actions: "zoomWithPinch" }],
          REMOVE_POINTER: { target: "pointerPanning" },
          LEAVE_POINTER: { target: "pointerPanning" },
        },
      },
    },
  },
  {
    actions: canvasMachineActions as any, // TODO: Remove this after updating to xstate v5
    guards: {
      hasMovedFromInitialPoint,
      isTrackpadZooming,
      isTrackpadPannig,
    },
  },
);
