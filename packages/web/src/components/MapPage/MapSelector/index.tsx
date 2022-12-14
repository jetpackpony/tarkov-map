import { compose } from "rambda";
import { useAppDispatch, useAppSelector } from "../../../store";
import { MapName } from "../../../store/mapData";
import { selectCurrentMap, selectMap } from "../../../store/uiSlice";
import MapSelector from "./MapSelector";

export type onMapSelected = (payload: { mapId: MapName }) => void;

interface MapSelectorContainerProps {
  onMapSelected?: onMapSelected;
}

const MapSelectorContainer = ({ onMapSelected }: MapSelectorContainerProps) => {
  const currentMap = useAppSelector(selectCurrentMap);
  const dispatch = useAppDispatch();
  const onSelected: onMapSelected = (payload) => {
    onMapSelected && onMapSelected(payload);
    compose(dispatch, selectMap)(payload);
  };

  return <MapSelector currentMap={currentMap} onMapSelected={onSelected} />;
};

export default MapSelectorContainer;
