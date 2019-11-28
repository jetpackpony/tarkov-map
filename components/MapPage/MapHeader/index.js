import { h } from 'preact';
import mapData from '../../../store/mapData';
import './mapHeader.css';

const mapObject = (f, obj) => (
  Object.keys(obj).map((key) => f(key, obj[key], obj))
);

const getMapGroups = () => {
  return Object.keys(mapData.maps).reduce((acc, key) => {
    const map = mapData.maps[key];
    if (!acc[map.groupName]) {
      acc[map.groupName] = {};
    }
    acc[map.groupName][key] = map.title;
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
    selected={isSelected }
  >
    {name}
  </option>
);

const getFirstKey = (obj) => Object.keys(obj)[0];
const objectLength = (obj) => Object.keys(obj).length;

const MapHeader = ({ currentMap, onMapSelected, openSidebar }) => {
  const mapGroups = getMapGroups();
  return (
    <header class="page">
      <select
        id="map-select"
        onChange={(e) => onMapSelected(e.target.value)}
      >
        {
          mapObject(
            (groupName, maps) => (
              (objectLength(maps) === 1)
                ? (
                  <MapOption
                    mapId={getFirstKey(maps)}
                    name={groupName}
                    isSelected={getFirstKey(maps) === currentMap}
                  />
                )
                : (
                  <MapOptGroup label={groupName}>
                    {
                      mapObject(
                        (mapId, name) => (
                          <MapOption
                            mapId={mapId}
                            name={`${groupName} - ${name}`}
                            isSelected={mapId === currentMap}
                          />
                        ),
                        maps
                      )
                    }
                  </MapOptGroup>
                )
            ),
            mapGroups
          )
        }
      </select>
      <button class="menu-icon" onClick={openSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </header>
  );
};

export default MapHeader;