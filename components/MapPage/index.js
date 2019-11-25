import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import map from '../../Customs.png';
import { connect } from 'react-redux';

const rand = () => Math.random() * 1000;

const MapPage = ({ markers, dispatch }) => {
  return (
    <div>
      <div>MapPage</div>
      <button onClick={
        () => dispatch({ type: 'ADD_MARKER', coords: { x: rand(), y: rand() } })
      }>
        Add Marker
      </button>
      <MapCanvas imgPath={map} markers={markers} />
      <MapInfo />
    </div>
  );
};

const stateToProps = (state) => state;
const dispatchToProps = null;

export default connect(stateToProps, dispatchToProps)(MapPage);