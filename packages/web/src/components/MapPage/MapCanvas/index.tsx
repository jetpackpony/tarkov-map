import { compose } from "rambda";
import MapCanvas from "./MapCanvas";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addMarker,
  removeMarkers,
  selectMarkers,
} from "../../../store/markersSlice";
import {
  selectCurrentMap,
  selectIsTrackPad,
  switchToTrackPad,
} from "../../../store/uiSlice";
import mapData from "../../../store/mapData";

const MapCanvasContainer = () => {
  const currentMap = useAppSelector(selectCurrentMap);
  const imgPath = mapData.maps[currentMap].imgPath;
  const markers = useAppSelector(selectMarkers);
  const dispatch = useAppDispatch();
  const addMarkerDispatch = compose(dispatch, addMarker);
  const removeMarkersDispatch = compose(dispatch, removeMarkers);

  return (
    <MapCanvas
      imgPath={imgPath}
      markers={markers}
      addMarker={addMarkerDispatch}
      removeMarkers={removeMarkersDispatch}
    />
  );
};

export default MapCanvasContainer;
