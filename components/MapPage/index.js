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
    const currentMapData = mapData.mapGroups[currentMap[0]].maps[currentMap[1]];

    return (
      <div>
        <div>Current map: {currentMap.join(" - ")}</div>
        <button onClick={addMarker}>
          Add Marker
        </button>
        <MapCanvas imgPath={currentMapData.imgPath} markers={markers} />
        <MapInfo />
      </div>
    );
  };

const stateToProps = (state) => {
  return {
    currentMap: state.ui.currentMap,
    markers: state.markers
  };
};
const dispatchToProps = (dispatch) => ({
  addMarker: () => dispatch(addMarker())
});

export default connect(stateToProps, dispatchToProps)(MapPage);