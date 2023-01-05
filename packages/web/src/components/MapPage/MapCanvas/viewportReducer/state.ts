import { Coords } from "../../../../types";
import { minScale } from "./constants";

export interface ViewportState {
  scale: number;
  pos: Coords;
}

export function initViewport(): ViewportState {
  return {
    scale: minScale,
    pos: { x: 0, y: 0 },
  };
}
