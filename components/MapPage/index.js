import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import { connect } from 'react-redux';
import { addMarker } from '../../store/actions';
import mapData from '../../store/mapData';

export const MapPage =
  ({
    currentMap,
    markers,
    addMarker
  }) => {
    const currentMapData = mapData.maps[currentMap];

    return (
      <div>
        <div>Current map: {currentMapData.title}</div>
        <button onClick={addMarker}>
          Add Marker
        </button>
        <MapCanvas imgPath={currentMapData.imgPath} markers={markers} />
        <MapInfo />
      </div>
    );
  };

const stateToProps = (state) => {
  const currentMap = state.ui.currentMap;
  const markers = state.mapState[currentMap].markers;
  return {
    currentMap,
    markers
  };
};
const dispatchToProps = (dispatch) => ({
  addMarker: () => dispatch(addMarker())
});

export default connect(stateToProps, dispatchToProps)(MapPage);