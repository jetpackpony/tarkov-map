import { h } from "preact";
import { clearMap } from "../../store/markersSlice";
import {
  changeMarkerColor,
  selectIsLoading,
  selectMarkerColor,
} from "../../store/uiSlice";
import { compose } from "rambda";
import { MapPage } from "./MapPage";
import { useAppDispatch, useAppSelector } from "../../store";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";

interface MapPageContainerProps {
  path: string;
}

export default ({ path }: MapPageContainerProps) => {
  const isLoading = useSelector(selectIsLoading);
  const markerColor = useAppSelector(selectMarkerColor);
  const dispatch = useAppDispatch();
  const clearMapDispatch = compose(dispatch, clearMap);
  const onMarkerColorChanged = compose(dispatch, changeMarkerColor);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <MapPage
      clearMap={clearMapDispatch}
      markerColor={markerColor}
      onMarkerColorChanged={onMarkerColorChanged}
    />
  );
};
