import { h, Fragment } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import { connect } from 'react-redux';
import {
  addMarker,
  removeMarkers,
  toggleExtractAction,
  selectMap,
  changeMarkerColor,
  clearMap
} from '../../store/actions';
import mapData from '../../store/mapData';
import MapHeader from './MapHeader';
import './mapPage.css';
import Sidebar from './Sidebar';
import { useState } from 'preact/compat';
import ColorPicker from './ColorPicker';
import MapSelector from './MapSelector';
import Button from './Button/Button';
import LangPicker from './LangPicker';

export const MapPage =
  ({
    currentMap,
    markers,
    selectedExtracts,
    markerColor,
    toggleExtract,
    addMarker,
    removeMarkers,
    onMapSelected,
    onMarkerColorChanged,
    clearMap
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
          headerElement={
            <>
              <MapSelector currentMap={currentMap} onMapSelected={onMapSelected} />
              <LangPicker />
            </>
          }
        >
          <ColorPicker
            color={markerColor}
            onChange={onMarkerColorChanged}
          />
          <MapInfo
            extracts={currentMapData.extracts}
            selected={selectedExtracts}
            toggleExtract={toggleExtract}
          />
          <Button onClick={() => clearMap(currentMap)}>Очистить карту</Button>
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
    selectedExtracts,
    markerColor: state.ui.markerColor
  };
};
const dispatchToProps = (dispatch) => ({
  toggleExtract: (extId) => dispatch(toggleExtractAction(extId)),
  addMarker: (coords) => dispatch(addMarker(coords)),
  removeMarkers: (ids) => dispatch(removeMarkers(ids)),
  onMapSelected: (mapId) => dispatch(selectMap(mapId)),
  onMarkerColorChanged: (color) => dispatch(changeMarkerColor(color)),
  clearMap: (mapId) => dispatch(clearMap(mapId))
});

export default connect(stateToProps, dispatchToProps)(MapPage);