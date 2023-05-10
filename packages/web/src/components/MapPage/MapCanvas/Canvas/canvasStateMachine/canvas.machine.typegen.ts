// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  "internalEvents": {
    "xstate.init": { type: "xstate.init" };
  };
  "invokeSrcNameMap": {};
  "missingImplementations": {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  "eventsCausingActions": {
    leftClick: "REMOVE_POINTER";
    panWithPointer: "POINTER_MOVE";
    panWithTrackpad: "wheel";
    pointerDown: "pointerdown";
    pointerLeave: "pointerleave";
    pointerMove: "pointermove";
    pointerUp: "pointerup";
    resetCanvas: "RESET_CANVAS";
    zoomWithPinch: "POINTER_MOVE";
    zoomWithTrackpad: "wheel";
    zoomWithWheel: "wheel";
  };
  "eventsCausingDelays": {};
  "eventsCausingGuards": {
    hasMovedFromInitialPoint: "POINTER_MOVE";
    isTrackpadPannig: "wheel";
    isTrackpadZooming: "wheel";
  };
  "eventsCausingServices": {};
  "matchesStates": "idle" | "pinchZooming" | "pointerDown" | "pointerPanning";
  "tags": never;
}
