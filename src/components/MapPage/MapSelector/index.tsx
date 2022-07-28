import { h } from 'preact';
import mapData from '../../../store/mapData';
import './mapSelector.css';
import { useTranslation } from 'react-i18next';

const mapObject = (f, obj) => (
  Object.keys(obj).map((key) => f(key, obj[key], obj))
);

const getMapGroups = (lang) => {
  return Object.keys(mapData.maps).reduce((acc, key) => {
    const map = mapData.maps[key];
    if (!acc[map.groupId]) {
      acc[map.groupId] = {
        groupName: map.groupName[lang],
        maps: {}
      };
    }
    acc[map.groupId].maps[key] = map.title[lang];
    return acc;
  }, {});
};

const MapOptGroup = ({ label, children }) => {
  return (
    <optgroup label={label}>
      {children}
    </optgroup>
  );
};

const MapOption = ({ mapId, name, isSelected }) => (
  <option
    value={mapId}
    selected={isSelected}
  >
    {name}
  </option>
);

const MapSelector = ({ currentMap, onMapSelected }) => {
  const { i18n } = useTranslation();
  const mapGroups = getMapGroups(i18n.language);
  return (
    <select
      id="map-select"
      onChange={(e) => onMapSelected(e.target.value)}
    >
      {
        mapObject(
          (_, group) => (
            <MapOptGroup label={group.groupName}>
              {
                mapObject(
                  (mapId, name) => (
                    <MapOption
                      mapId={mapId}
                      name={`${group.groupName} - ${name}`}
                      isSelected={mapId === currentMap}
                    />
                  ),
                  group.maps
                )
              }
            </MapOptGroup>
          ),
          mapGroups
        )
      }
    </select>
  );
};

export default MapSelector;