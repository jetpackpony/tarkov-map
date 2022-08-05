import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import MapHeader from './MapHeader';
import './mapPage.css';
import Sidebar from './Sidebar';
import { useState } from 'preact/compat';
import ColorPicker from './ColorPicker';
import MapSelector from './MapSelector';
import Button from './Button/Button';
import LangPicker from './LangPicker';
import { useLanguageContext } from '../../I18nContext';
import { Color } from '../../types';

export interface MapPageProps {
  markerColor: Color,
  onMarkerColorChanged: (payload: { color: Color }) => any,
  clearMap: () => any,
};

export const MapPage =
  ({
    markerColor,
    onMarkerColorChanged,
    clearMap,
  }: MapPageProps) => {
    const { t } = useLanguageContext();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
      <main class="map-page">
        <MapHeader
          openSidebar={() => setSidebarOpen(true)}
        />
        <MapCanvas />
        <Sidebar
          isOpen={isSidebarOpen}
          close={() => setSidebarOpen(false)}
          headerElement={
            <>
              <MapSelector />
              <LangPicker />
            </>
          }
        >
          <ColorPicker
            color={markerColor}
            onChange={(color) => onMarkerColorChanged({ color })}
          />
          <MapInfo />
          <Button
            onClick={clearMap}
          >
            {t('Clear map')}
          </Button>
        </Sidebar>
      </main>
    );
  };
