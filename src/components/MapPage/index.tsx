import { h } from 'preact';
import { clearMap } from '../../store/markersSlice';
import { changeMarkerColor, selectMarkerColor } from '../../store/uiSlice';
import { compose } from 'rambda';
import { MapPage } from './MapPage';
import { useAppDispatch, useAppSelector } from '../../store';

export default () => {
  const markerColor = useAppSelector(selectMarkerColor);
  const dispatch = useAppDispatch();
  const clearMapDispatch = compose(dispatch, clearMap);
  const onMarkerColorChanged = compose(dispatch, changeMarkerColor);

  return (
    <MapPage
      clearMap={clearMapDispatch}
      markerColor={markerColor}
      onMarkerColorChanged={onMarkerColorChanged}
    />
  );
};