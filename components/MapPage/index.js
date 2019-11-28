import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import { connect } from 'react-redux';
import {
  addMarker,
  removeMarkers,
  toggleExtractAction,
  selectMap
} from '../../store/actions';
import mapData from '../../store/mapData';
import MapHeader from './MapHeader';
import './mapPage.css';
import Sidebar from './Sidebar';
import { useState } from 'preact/compat';

export const MapPage =
  ({
    currentMap,
    markers,
    selectedExtracts,
    toggleExtract,
    addMarker,
    removeMarkers,
    onMapSelected
  }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const currentMapData = mapData.maps[currentMap];
    const extractionMarkers =
      currentMapData.extracts
        .filter((e) => selectedExtracts.includes(e.id))
        .map((e) => {
          return {
            ...e,
            type: "extraction"
          };
        });

    return (
      <main class="map-page">
        <MapHeader
          currentMap={currentMap}
          onMapSelected={onMapSelected}
          openSidebar={() => setSidebarOpen(true)}
        />
        <MapCanvas
          imgPath={currentMapData.imgPath}
          markers={markers.concat(extractionMarkers)}
          addMarker={addMarker}
          removeMarkers={removeMarkers}
        />
        <Sidebar
          isOpen={isSidebarOpen}
          close={() => setSidebarOpen(false)}
        >
          <MapInfo
            extracts={currentMapData.extracts}
            selected={selectedExtracts}
            toggleExtract={toggleExtract}
          />
        </Sidebar>
      </main>
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
  removeMarkers: (ids) => dispatch(removeMarkers(ids)),
  onMapSelected: (mapId) => dispatch(selectMap(mapId))
});

export default connect(stateToProps, dispatchToProps)(MapPage);