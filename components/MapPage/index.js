import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import { connect } from 'react-redux';
import {
  addMarker,
  removeMarkers,
  toggleExtractAction
} from '../../store/actions';
import mapData from '../../store/mapData';

export const MapPage =
  ({
    currentMap,
    markers,
    selectedExtracts,
    toggleExtract,
    addMarker,
    removeMarkers
  }) => {
    const currentMapData = mapData.maps[currentMap];
    const extractionMarkers =
      currentMapData.extracts
        .filter((e) => selectedExtracts.includes(e.id))
        .map((e) => {
          return { id: e.id, coords: e.coords };
        });

    return (
      <div>
        <div>Current map: {currentMapData.title}</div>
        <MapCanvas
          imgPath={currentMapData.imgPath}
          markers={markers.concat(extractionMarkers)}
          addMarker={addMarker}
          removeMarkers={removeMarkers}
        />
        <MapInfo
          extracts={currentMapData.extracts}
          selected={selectedExtracts}
          toggleExtract={toggleExtract}
        />
      </div>
    );
  };

const stateToProps = (state) => {
  const currentMap = state.ui.currentMap;
  const markers = state.mapState[currentMap].markers;
  const selectedExtracts = state.mapState[currentMap].selectedExtracts;
  return {
    currentMap,
    markers,
    selectedExtracts
  };
};
const dispatchToProps = (dispatch) => ({
  toggleExtract: (extId) => dispatch(toggleExtractAction(extId)),
  addMarker: (coords) => dispatch(addMarker(coords)),
  removeMarkers: (ids) => dispatch(removeMarkers(ids))
});

export default connect(stateToProps, dispatchToProps)(MapPage);