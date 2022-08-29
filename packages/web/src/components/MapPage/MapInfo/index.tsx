import { compose } from "rambda";
import { useAppDispatch, useAppSelector } from "../../../store";
import mapData from "../../../store/mapData";
import {
  selectSelectedExtracts,
  toggleExtract,
} from "../../../store/markersSlice";
import { selectCurrentMap } from "../../../store/uiSlice";
import MapInfo from "./MapInfo";

const MapInfoContainer = () => {
  const currentMap = useAppSelector(selectCurrentMap);
  const dispatch = useAppDispatch();
  const extracts = mapData.maps[currentMap].extracts;
  const selected = useAppSelector(selectSelectedExtracts);
  const toggleExtractDispatch = compose(dispatch, toggleExtract);

  return (
    <MapInfo
      extracts={extracts}
      selected={selected}
      toggleExtract={toggleExtractDispatch}
    />
  );
};

export default MapInfoContainer;
