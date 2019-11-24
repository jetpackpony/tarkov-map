import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import map from '../../Customs.png';
import { useState } from 'preact/compat';

const rand = () => Math.random() * 1000;

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  return (
    <div>
      <div>MapPage</div>
      <button onClick={() => setMarkers(markers.concat([{ x: rand(), y: rand() }]))}>Add Marker</button>
      <MapCanvas imgPath={map} markers={markers} />
      <MapInfo />
    </div>
  );
};

export default MapPage;