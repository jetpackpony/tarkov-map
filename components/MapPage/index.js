import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import map from '../../Customs.png';
import { useState } from 'preact/compat';

const MapPage = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>MapPage</div>
      <button onClick={() => setCount(count + 1)}>Button</button>
      <MapCanvas imgPath={map} count={count} />
      <MapInfo />
    </div>
  );
};

export default MapPage;