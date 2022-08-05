import { compose } from "rambda";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectCurrentMap, selectMap } from "../../../store/uiSlice";
import MapSelector from "./MapSelector";

export default () => {
  const currentMap = useAppSelector(selectCurrentMap);
  const dispatch = useAppDispatch();
  const onMapSelected = compose(dispatch, selectMap);

  return (
    <MapSelector
      currentMap={currentMap}
      onMapSelected={onMapSelected}
    />
  )
};