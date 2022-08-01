import { h } from 'preact';
import { connect } from 'react-redux';
import {
  addMarker,
  removeMarkers,
  toggleExtractAction,
  selectMap,
  changeMarkerColor,
  clearMap,
  switchToTrackPad,
  Action
} from '../../store/actions';
import { Dispatch } from 'redux';
import { compose } from 'rambda';
import { MapPage } from './MapPage';
import { AppState } from '../../types';

const stateToProps = (state: AppState) => {
  const currentMap = state.ui.currentMap;
  const markers = state.mapState[currentMap].markers;
  const selectedExtracts = state.mapState[currentMap].selectedExtracts;
  return {
    currentMap,
    markers,
    selectedExtracts,
    markerColor: state.ui.markerColor,
    isTrackPad: state.ui.isTrackPad,
  };
};
const dispatchToProps = (dispatch: Dispatch<Action>) => ({
  toggleExtract: compose(dispatch, toggleExtractAction),
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