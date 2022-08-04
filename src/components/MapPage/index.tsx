import { h } from 'preact';
import { connect } from 'react-redux';
import {
  addMarker,
  removeMarkers,
  toggleExtract,
  clearMap
} from '../../store/markersSlice';
import {
  selectMap,
  changeMarkerColor,
  switchToTrackPad
} from '../../store/uiSlice';
import { Dispatch } from 'redux';
import { compose } from 'rambda';
import { MapPage } from './MapPage';
import { AppDispatch, AppState } from '../../store';

const stateToProps = (state: AppState) => {
  const currentMap = state.ui.currentMap;
  const markers = state.markers[currentMap].markers;
  const selectedExtracts = state.markers[currentMap].selectedExtracts;
  return {
    currentMap,
    markers,
    selectedExtracts,
    markerColor: state.ui.markerColor,
    isTrackPad: state.ui.isTrackPad,
  };
};
const dispatchToProps = (dispatch: AppDispatch) => ({
  toggleExtract: compose(dispatch, toggleExtract),
  addMarker: compose(dispatch, addMarker),
  removeMarkers: compose(dispatch, removeMarkers),
  onMapSelected: compose(dispatch, selectMap),
  onMarkerColorChanged: compose(dispatch, changeMarkerColor),
  clearMap: compose(dispatch, clearMap),
  onSwitchToTrackPad: compose(dispatch, switchToTrackPad)
});

type StateProps = ReturnType<typeof stateToProps>;
type DispatchProps = ReturnType<typeof dispatchToProps>;
export type PropsFromRedux = StateProps & DispatchProps;

export default connect(stateToProps, dispatchToProps)(MapPage);