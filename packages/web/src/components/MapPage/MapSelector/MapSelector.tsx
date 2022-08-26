import { h } from "preact";
import mapData, { MapName } from "../../../store/mapData";
import styles from "./mapSelector.module.css";
import { MapGroupId } from "../../../types";
import { useLanguageContext, Language } from "../../../I18nContext";

type MapGroup = {
  groupName: string;
  maps: {
    [key in MapName]?: string;
  };
};

type MapGroups = {
  [key in MapGroupId]: MapGroup;
};

const getMapGroups = (lang: Language): MapGroups => {
  return Object.values(MapName).reduce((acc, mapName) => {
    const map = mapData.maps[mapName];
    if (!acc[map.groupId]) {
      acc[map.groupId] = {
        groupName: map.groupName[lang],
        maps: {},
      };
    }
    acc[map.groupId].maps[mapName] = map.title[lang];
    return acc;
  }, {} as MapGroups);
};

interface MapSelectorProps {
  currentMap: MapName;
  onMapSelected: (payload: { mapId: MapName }) => any;
}

const MapSelector = ({ currentMap, onMapSelected }: MapSelectorProps) => {
  const { getCurrentLang } = useLanguageContext();
  const mapGroups = getMapGroups(getCurrentLang());
  return (
    <ul class={styles.container}>
      {Object.values(mapGroups).map((group) => (
        <li class={styles.groupContainer}>
          <h4 class={styles.groupHeader}>{group.groupName}</h4>
          <ul>
            {Object.entries(group.maps).map(([mapId, name]) => (
              <li
                class={`${styles.map} ${
                  mapId === currentMap ? styles.selected : ""
                }`}
                onClick={() => onMapSelected({ mapId })}
              >
                {`${group.groupName} - ${name}`}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default MapSelector;
