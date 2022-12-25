import { h } from "preact";
import mapData, { MapName } from "../../../store/mapData";
import styles from "./mapSelector.module.css";
import { MapGroupId } from "../../../types";
import { Language, useLanguage } from "../../../language";
import { onMapSelected } from ".";

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

export interface MapSelectorProps {
  currentMap: MapName;
  onMapSelected: onMapSelected;
}

const MapSelector = ({ currentMap, onMapSelected }: MapSelectorProps) => {
  const { currentLang } = useLanguage();
  const mapGroups = getMapGroups(currentLang);
  return (
    <ul class={styles.container}>
      {Object.values(mapGroups).map((group) => (
        <li key={group.groupName} class={styles.groupContainer}>
          <h4 class={styles.groupHeader}>{group.groupName}</h4>
          <ul>
            {Object.entries(group.maps).map(([mapId, name]) => (
              <li
                key={mapId}
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
