import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';

const MapPage = () => {
  return (
    <div>
      <div>MapPage</div>
      <MapCanvas />
      <MapInfo />
    </div>
  );
};

export default MapPage;