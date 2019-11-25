import { h } from 'preact';
import MapCanvas from './MapCanvas';
import MapInfo from './MapInfo';
import { connect } from 'react-redux';
import { addMarker } from '../../store/actions';

export const MapPage = ({ imgPath, markers, addMarker }) => {
  return (
    <div>
      <div>MapPage</div>
      <button onClick={addMarker}>
        Add Marker
      </button>
      <MapCanvas imgPath={imgPath} markers={markers} />
      <MapInfo />
    </div>
  );
};

const stateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({
  addMarker: () => dispatch(addMarker())
});

export default connect(stateToProps, dispatchToProps)(MapPage);