import { ComponentChildren, h } from 'preact';
import mapData, { MapName } from '../../../store/mapData';
import './mapSelector.css';
import { MapPageProps } from '../MapPage';
import { getCurrentLang, Language } from '../../../i18n';
import { isEnum, MapGroupId } from '../../../types';
import { TargetedEvent } from 'preact/compat';

type MapGroup = {
  groupName: string,
  maps: {
    [key in MapName]?: string
  }
};

type MapGroups = {
  [key in MapGroupId]: MapGroup
};

const getMapGroups = (lang: Language): MapGroups => {
  return Object.values(MapName).reduce(
    (acc, mapName) => {
      const map = mapData.maps[mapName];
      if (!acc[map.groupId]) {
        acc[map.groupId] = {
          groupName: map.groupName[lang],
          maps: {}
        };
      }
      acc[map.groupId].maps[mapName] = map.title[lang];
      return acc;
    },
    {} as MapGroups
  );
};

interface MapOptGroupProps {
  label: string,
  children: ComponentChildren
};

const MapOptGroup = ({ label, children }: MapOptGroupProps) => {
  return (
    <optgroup label={label}>
      {children}
    </optgroup>
  );
};

interface MapOptionProps {
  mapId: MapName,
  name: string,
  isSelected: boolean
};

const MapOption = ({ mapId, name, isSelected }: MapOptionProps) => (
  <option
    value={mapId}
    selected={isSelected}
  >
    {name}
  </option>
);

interface MapSelectorProps {
  currentMap: MapName,
  onMapSelected: MapPageProps['onMapSelected']
};

const MapSelector = ({ currentMap, onMapSelected }: MapSelectorProps) => {
  const mapGroups = getMapGroups(getCurrentLang());
  const onChange = (e: TargetedEvent<HTMLSelectElement, Event>) => {
    if (e && isEnum(MapName)(e.currentTarget.value)) {
      onMapSelected(e.currentTarget.value)
    }
  };
  return (
    <select
      id="map-select"
      onChange={onChange}
    >
      {
        Object.values(mapGroups).map((group) => (
          <MapOptGroup label={group.groupName}>
            {
              Object.entries(group.maps).map(([mapId, name]) => (
                <MapOption
                  mapId={mapId}
                  name={`${group.groupName} - ${name}`}
                  isSelected={mapId === currentMap}
                />
              ))
            }
          </MapOptGroup>
        ))
      }
    </select>
  );
};

export default MapSelector;