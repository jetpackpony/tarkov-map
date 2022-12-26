import { h } from "preact";
import MapCanvas from "./MapCanvas";
import MapInfo from "./MapInfo";
import MapHeader from "../MapHeader";
import styles from "./mapPage.module.css";
import Sidebar from "../Sidebar";
import { useState } from "preact/compat";
import ColorPicker from "../ColorPicker";
import MapSelector from "./MapSelector";
import buttonStyles from "../Button/Button.module.css";
import LangPicker from "../LangPicker";
import { Color } from "../../types";
import { useLanguage } from "../../language";

export interface MapPageProps {
  markerColor: Color;
  onMarkerColorChanged: (payload: { color: Color }) => void;
  clearMap: () => void;
}

export const MapPage = ({
  markerColor,
  onMarkerColorChanged,
  clearMap,
}: MapPageProps) => {
  const { t } = useLanguage();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTouchUsed, setIsTouchUsed] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <main class={styles.mapPage}>
      <MapHeader
        openSidebar={(isTouchUsed) => {
          setIsTouchUsed(isTouchUsed);
          setSidebarOpen(true);
        }}
      />
      <MapCanvas />
      <Sidebar
        isOpen={isSidebarOpen}
        close={closeSidebar}
        showCloseButton={isTouchUsed}
        headerElement={<LangPicker />}
      >
        <ColorPicker
          color={markerColor}
          onChange={(color) => onMarkerColorChanged({ color })}
        />
        <MapSelector onMapSelected={closeSidebar} />
        <MapInfo />
        <button
          class={buttonStyles.button}
          onClick={() => {
            clearMap();
            closeSidebar();
          }}
        >
          {t("Clear map")}
        </button>
      </Sidebar>
    </main>
  );
};
