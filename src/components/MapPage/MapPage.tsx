import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import mapData from '../../store/mapData';
import MapHeader from './MapHeader';
import './mapPage.css';
import Sidebar from './Sidebar';
import { useState } from 'preact/compat';
import ColorPicker from './ColorPicker';
import MapSelector from './MapSelector';
import Button from './Button/Button';
import LangPicker from './LangPicker';
import { useTranslation } from 'react-i18next';
import { PropsFromRedux } from '.';

interface MapPageProps extends PropsFromRedux {
};

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
    clearMap,
    isTrackPad,
    onSwitchToTrackPad
  }: MapPageProps) => {
    const { t } = useTranslation();
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
          isTrackPad={isTrackPad}
          onSwitchToTrackPad={onSwitchToTrackPad}
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
          <Button onClick={() => clearMap(currentMap)}>{t('Clear map')}</Button>
        </Sidebar>
      </main>
    );
  };
